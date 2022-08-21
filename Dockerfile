FROM python:3.7
RUN mkdir /app
WORKDIR /app/
ADD . /app/
WORKDIR /app/Backup
RUN rm *
RUN pip install -r requirements.txt
CMD ["python", "/app/app.py"]
