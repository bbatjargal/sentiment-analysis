# Sentiment Analysis (RNN model with LSTMs) using Tensorflow

## Docker Setup
0. Install [Docker](https://docs.docker.com/engine/installation/)
1. Run 'git clone https://github.com/bbatjargal/sentiment-analysis'
2. Open docker terminal and navigate to `/path/to/sentiment-analysis/05. Applications/backend-service`
3. Run `docker build . -t sentiment-api`
4. Run `docker run -p 8180:8180 sentiment-api`
5. Access `http://0.0.0.0:8180/sentiment?inputtext=i love it` from your browser [assuming you are on windows and docker-machine has that IP. Otherwise just use localhost]

## Native Setup
1. Anaconda distribution of python 3.6
2. 'pip install web.py==0.40-dev1' which installs Web.py for Python 3
