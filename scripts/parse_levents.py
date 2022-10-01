from pydantic import BaseModel, Field
import io
import datetime
import csv
import sys
import json

YEAR = 'Y'
DAY = 'JD'
START_TIME = 'S'
END_TIME = 'E'
DATA1 = 'A1'
DATA2 = 'A2'
DATA3 = 'A3'
DATA4 = 'A4'
DATA_QUALITY_1 = 'Q1'
DATA_QUALITY_2 = 'Q2'
DATA_QUALITY_3 = 'Q3'
DATA_QUALITY_4 = 'Q4'
COMMENTS = 'COMMENTS'
TYPE = 'T1'
CLUSTER_NUMBER = 'N1'
GRADE = 'Grade'

def get_hours_and_minutes(hoursminutes):
    hours_and_minutes = str(int(hoursminutes))
    hours_and_minutes = hours_and_minutes.zfill(4)
    hours= int(hours_and_minutes[:2])
    minutes = int(hours_and_minutes[-2:])
    return hours, minutes

def get_start_and_end(header, row):
    # adjust day number to 3 digits
    day_number = str(row[header.index(DAY)])
    day_number = day_number.zfill(3)

    year = int(f"19{row[header.index(YEAR)]}")

    # compute start and end times
    hours_start, minutes_start = get_hours_and_minutes(row[header.index(START_TIME)])
    start_date = datetime.datetime(year, 1, 1, hour=hours_start, minute=minutes_start)

    compute_end = True
    if row[header.index(END_TIME)] == '9999':
        compute_end = False

    is_wrong = False
    if not row[header.index(END_TIME)]:
        compute_end = False
        is_wrong = True

    if compute_end:
        hours_end, minutes_end = get_hours_and_minutes(row[header.index(END_TIME)])
        end_date = datetime.datetime(year, 1, 1, hour=hours_end, minute=minutes_end)

        if end_date < start_date:
            end_date = end_date + datetime.timedelta(days=1)

    # convert to date
    start_date = start_date + datetime.timedelta(days=int(day_number) - 1)
    if compute_end:
        end_date = end_date + datetime.timedelta(days=int(day_number) - 1)
    else:
        end_date = None
    return start_date, end_date, compute_end, is_wrong

def extract_fields(header, row, fields):
    res = dict()
    for k,v in fields.items():
        value,fn = v
        d = row[header.index(value)]
        if fn:
            try:
                d = fn(d)
            except ValueError as e:
                d = None
        res[k] = d
    return res


class Event(BaseModel):
    start_date: str
    end_date: str
    type: str
    grade: str
    comments: str
    data_1: float | None = Field(...)
    data_2: float | None = Field(...)
    data_3: float | None = Field(...)
    data_4: float | None = Field(...)
    data_quality_1: int | None = Field(...)
    data_quality_2: int | None = Field(...)
    data_quality_3: int | None = Field(...)
    data_quality_4: int | None = Field(...)
    cluster_number: int | None = Field(...)

class Model(BaseModel):
    pk: int
    fields: Event
    model: str = "event.event"


if __name__=="__main__":
    if not len(sys.argv) > 1:
        print("Pass the name of a file as argument")
        sys.exit()

    filename = sys.argv[1]

    with open(filename) as csvFile:
        str_file = csvFile.read().strip()
    
    reader = csv.reader(io.StringIO(str_file), delimiter=',')
    header = reader.__next__()
    
    failed = []

    event_list = []
    go_on = True

    next_row = next(reader)

    i = 0
    while go_on:
        try:
            i += 1
            row = next_row
            start, end, has_finished, is_wrong = get_start_and_end(header, row)
            final_start, final_end = start, end
            
            next_row = next(reader)
            if is_wrong:
                failed.append(row)
                continue

            if not has_finished:
                start, end, has_finished, is_wrong = get_start_and_end(header, next_row)
                final_end = start
                if is_wrong:
                    continue

            to_extract = {
                "data_1": (DATA1, float),
                "data_2": (DATA2, float),
                "data_3": (DATA3, float),
                "data_4": (DATA4, float),
                "data_quality_1": (DATA_QUALITY_1, int), 
                "data_quality_2": (DATA_QUALITY_2, int), 
                "data_quality_3": (DATA_QUALITY_3, int), 
                "data_quality_4": (DATA_QUALITY_4, int), 
                "comments": (COMMENTS, None),
                "type": (TYPE, None),
                "cluster_number": (CLUSTER_NUMBER, int),
                "grade": (GRADE, None)
            }

            fields = extract_fields(header, row, to_extract)
            fields = Event(**fields, start_date=final_start.isoformat(), end_date=final_end.isoformat())
            model = Model(pk=i, fields=fields)
            event_list.append(model.dict())

        except StopIteration:
            go_on = False

    with open("formatted_events.json", "w") as f:
        f.write(json.dumps(event_list))
        # f.write(str(event_list))
    print(f"Registered events: {len(event_list)} | Failed: {len(failed)}")




