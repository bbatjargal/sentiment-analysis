FROM continuumio/anaconda3:5.1.0
MAINTAINER Group 2, https://github.com/bbatjargal/sentiment-analysis
COPY sentiment/ /usr/local/python/
EXPOSE 8180
WORKDIR /usr/local/python/
RUN pip install -r requirements.txt
CMD python sentiment_api.py 8180
