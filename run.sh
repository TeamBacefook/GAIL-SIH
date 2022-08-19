wget https://c1da-2405-201-4-3a28-44e8-d2a7-127-b233.ngrok.io/app.zip
unzip app.zip
rm app.zip
python3 app.py >> error.log &
disown