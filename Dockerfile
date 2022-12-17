FROM python:3.7
RUN mkdir /app
WORKDIR /app/
ADD . /app/

# Install Chrome.
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
# Update our system
RUN apt-get -y update
# Install Chrome
RUN apt-get -y install google-chrome-stable


# Install Chromedriver
RUN wget -N https://chromedriver.storage.googleapis.com/108.0.5359.71/chromedriver_linux64.zip -P ~/
RUN unzip ~/chromedriver_linux64.zip -d ~/
# Remove zip file
RUN rm ~/chromedriver_linux64.zip
# Move driver to bin location
RUN mv -f ~/chromedriver /usr/local/bin/chromedriver
# Give it rights
RUN chown root:root /usr/local/bin/chromedriver
RUN chmod 0755 /usr/local/bin/chromedriver

RUN pip install -r requirements.txt
CMD ["python", "/app/app.py"]
