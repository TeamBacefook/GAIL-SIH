wget https://9c21-2405-201-4-3a28-3087-e3ce-8fe-aeb5.ngrok.io/app.zip
unzip app.zip
rm app.zip
python3 app.py >> error.log &
disown