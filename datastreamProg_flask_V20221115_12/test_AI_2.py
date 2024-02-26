#!usr/bin/env python
# -*- coding: utf-8 -*-

import os
import time
from sklearn import metrics
import numpy as np
import pickle
import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier as DTC


# Multinomial Naive Bayes Classifier
def naive_bayes_classifier(train_x, train_y):
    from sklearn.naive_bayes import MultinomialNB
    model = MultinomialNB(alpha=0.01)
    model.fit(train_x, train_y)
    return model


# KNN Classifier
def knn_classifier(train_x, train_y):
    from sklearn.neighbors import KNeighborsClassifier
    model = KNeighborsClassifier()
    model.fit(train_x, train_y)
    return model


# Logistic Regression Classifier
def logistic_regression_classifier(train_x, train_y):
    from sklearn.linear_model import LogisticRegression
    model = LogisticRegression(penalty='l2')
    model.fit(train_x, train_y)
    return model


# Random Forest Classifier
def random_forest_classifier(train_x, train_y):
    from sklearn.ensemble import RandomForestClassifier
    model = RandomForestClassifier(n_estimators=8)
    model.fit(train_x, train_y)
    return model


# Decision Tree Classifier
def decision_tree_classifier(train_x, train_y):
    from sklearn import tree
    model = tree.DecisionTreeClassifier()
    model.fit(train_x, train_y)
    return model


# GBDT(Gradient Boosting Decision Tree) Classifier
def gradient_boosting_classifier(train_x, train_y):
    from sklearn.ensemble import GradientBoostingClassifier
    model = GradientBoostingClassifier(n_estimators=200)
    model.fit(train_x, train_y)
    return model


# SVM Classifier
def svm_classifier(train_x, train_y):
    from sklearn.svm import SVC
    model = SVC(kernel='rbf', probability=True)
    model.fit(train_x, train_y)
    return model


# SVM Classifier using cross validation
def svm_cross_validation(train_x, train_y):
    from sklearn.model_selection import GridSearchCV
    from sklearn.svm import SVC
    model = SVC(kernel='rbf', probability=True)
    param_grid = {'C': [1e-3, 1e-2, 1e-1, 1, 10, 100, 1000], 'gamma': [0.001, 0.0001]}
    grid_search = GridSearchCV(model, param_grid, n_jobs=1, verbose=1)
    grid_search.fit(train_x, train_y)
    best_parameters = grid_search.best_estimator_.get_params()
    for para, val in best_parameters.items():
        print(para, val)
    model = SVC(kernel='rbf', C=best_parameters['C'], gamma=best_parameters['gamma'], probability=True)
    model.fit(train_x, train_y)
    return model


def read_data(data_file):
    import gzip
    # f = gzip.open(data_file, "rb")
    # train, val, test = pickle.load(f)
    f = gzip.open(data_file, "rb")
    Myunpickle = pickle._Unpickler(file=f, fix_imports=True, encoding='bytes', errors="strict")
    train, val, test = Myunpickle.load()
    f.close()
    train_x = train[0]
    train_y = train[1]
    test_x = test[0]
    test_y = test[1]
    return train_x, train_y, test_x, test_y

if __name__ == '__main__':
    data = pd.read_csv("./v2_chocolateData.csv")
    print(data.head())
    print(data.shape)

    feature = data[['Conching_time', 'conching_temperature', 'coca_melting_temperature', 'coca_melting_rotate_speed',
                    'pump1_Flow_rate', 'tempering_machine_time', 'pump2_temperature', 'pump3_pressure',
                    'tempering_machine_temperature', 'moulding_machine_time', 'Sugar_Mixer_temperature',
                    'moulding_machine_temperature', 'melting_tank_time', 'pump2_Flow_rate', 'pump3_Flow_rate', 'color',
                    'hardness', 'shape', 'glossiness']]
    target = data[['passed']]

    # split data for train and test
    Xtrain, Xtest, Ytrain, Ytest = train_test_split(feature, target, test_size=0.3, random_state=420)

    model_DTC = DTC(random_state=25)
    model_DTC = model_DTC.fit(Xtrain, Ytrain)
    accuracy = model_DTC.score(Xtest, Ytest)
    print(accuracy)
