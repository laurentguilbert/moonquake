FROM ubuntu:22.04 as builder

ARG DEBIAN_FRONTEND=interactive
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

# Update and install
RUN apt-get update \
   && apt-get install -y --no-install-recommends python3 python3-dev python3-distutils python3-venv \
   && apt-get clean \
   && apt-get autoremove

RUN python3 -m venv /opt/venv
# Add venv to $PATH to activate it
ENV PATH="/opt/venv/bin:$PATH"

# Tell pip to not use cache
ENV PIP_NO_CACHE_DIR=true

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr 
ENV PYTHONUNBUFFERED 1

# Use pip to install requirements
RUN pip install --upgrade pip
COPY backend/requirements.txt .
RUN pip install -r requirements.txt


FROM ubuntu:22.04 as runner

ARG DEBIAN_FRONTEND=interactive
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr 
ENV PYTHONUNBUFFERED 1

# Update and install
RUN apt-get update \
   && apt-get install -y --no-install-recommends python3 python3-dev python3-distutils python3-venv \
   && rm -rf /var/lib/apt/lists/* \
   && apt-get clean \
   && apt-get autoremove

# Create an app user
ENV APP_USER=moonquake
RUN groupadd -r $APP_USER && \
    useradd -m -g $APP_USER -s /sbin/nologin -c "moonquake app user" $APP_USER
ENV APP_USER_HOME=/home/$APP_USER

RUN mkdir -p /var/log/gunicorn
RUN mkdir -p /var/run/gunicorn

RUN chown -cR $APP_USER:$APP_USER /var/log/gunicorn/
RUN chown -cR $APP_USER:$APP_USER /var/run/gunicorn/

# Change user and go to home
USER $APP_USER
WORKDIR $APP_USER_HOME/app
# Copy and clean
COPY ./backend/project ./
COPY ./deploy/gunicorn-config.py ./
COPY ./deploy/run.sh ./

# Change ownership
#USER root
#RUN chown -R $APP_USER:users app/


#USER $APP_USER

# Activate venv
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

CMD ["bash", "run.sh"]
#CMD ["python", "manage.py", "runserver"]
