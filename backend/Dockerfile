FROM python:3.12 AS python-build
RUN pip install mysqlclient
RUN apt-get update && apt-get install -y libmariadb3 netcat-traditional pkg-config
RUN pip install --upgrade pip


WORKDIR /

COPY ./ /app/backend

# Create environment
RUN python3 -m pip install -r /app/backend/requirements.txt
RUN pip install --upgrade mysqlclient

WORKDIR /app/backend

CMD ["sh","entrypoint.sh"]