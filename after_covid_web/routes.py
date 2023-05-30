import pandas as pd
import numpy as np
import yfinance as yf
import datetime as dt
from flask import render_template, url_for, flash, redirect, jsonify
from after_covid_web import app
from after_covid_web.forms import *
from after_covid_web.models import *


def get_sp500_data():
    sp500_df = yf.download(["^GSPC"], start="2020-01-01", end=None, interval='1wk')
    time_arr = sp500_df.index.values.astype(np.int64) // 10 ** 6
    close_arr = sp500_df.Close.to_list()
    sp500_data = np.transpose(np.array([time_arr, close_arr]))
    last_data = dict(y=yf.Ticker('^GSPC').fast_info.last_price, x=dt.datetime.utcnow().timestamp() * 1000)
    return sp500_data.tolist(), last_data


def add_chart_wrap(data):
    return dict(
        name='S&P 500',
        data=data,
        tooltip={
            'valueDecimals': 2
        },
        marker={
            'symbol': 'circle'
        },
        states={
            'hover': {
                'enabled': False
            },
            'select': {
                'enabled': False
            },

        }

    )


@app.route("/")
@app.route("/home")
def home():
    x_axis_plot_lines = dict(
        color='red',
        dashStyle='dash',
        value=dt.datetime(2020, 1, 31).timestamp() * 1000,
        width=3,
        label={
            'text': 'Covid outbreak',
            'align': 'center',
            'style': {
                'color': 'gray'
            }
        }
    )
    sp500_data, last_data = get_sp500_data()
    sp500_data_wrapped = add_chart_wrap(sp500_data)
    return render_template('home.html', sp500_data=sp500_data_wrapped, last_data=last_data, plot_lines=x_axis_plot_lines)


@app.route("/about-me")
def about_me():
    return render_template('about_me.html', title='About me', )
