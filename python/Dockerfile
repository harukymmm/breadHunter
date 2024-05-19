FROM python:3.9.11
USER root
ENV PYTHONUNBUFFERED 1

RUN apt-get update
RUN apt-get -y install locales && \
    apt-get install -y libpoppler-cpp-dev &&\ 
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm

RUN apt-get install -y vim less
RUN pip install --upgrade pip
RUN pip3 install --upgrade pip
RUN pip install --upgrade setuptools

RUN mkdir /python
ADD . /python
WORKDIR /python

RUN pip3 install torch torchvision 
RUN pip install -r requirements.txt


