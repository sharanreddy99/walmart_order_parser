FROM python:3.12 AS python-build
RUN pip install mysqlclient

FROM python:3.12-slim
COPY --from=python-build /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
RUN apt-get update && apt-get install -y libmariadb3 netcat-traditional
RUN pip install --upgrade pip


WORKDIR /

COPY ./ /app/backend

# Create environment
RUN python3 -m pip install -r /app/backend/requirements.txt
RUN pip install --upgrade mysqlclient

WORKDIR /app/backend

CMD ["sh","entrypoint.sh"]