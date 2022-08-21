FROM python:3.7
RUN mkdir /app
WORKDIR /app/
ADD . /app/
RUN rm /app/Backup *
RUN pip install -r requirements.txt
CMD ["python", "/app/app.py"]
