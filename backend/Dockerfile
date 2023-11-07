FROM python:3.11.1-alpine3.16

WORKDIR /

COPY ./ /app/backend

# Create environment
RUN python3 -m pip install -r /app/backend/requirements.txt

WORKDIR /app/backend

CMD ["flask", "run", "--host=0.0.0.0"]