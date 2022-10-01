import json

with open("../backend/project/event/fixtures/formatted_events.json") as infile:
    content = infile.read()
    events = json.loads(content)
    event_times = [(event["pk"], event["fields"]["start_date"], event["fields"]["end_date"]) for event in events]
    with open('event_times.json', 'w') as outfile:
        outfile.write(json.dumps(event_times))