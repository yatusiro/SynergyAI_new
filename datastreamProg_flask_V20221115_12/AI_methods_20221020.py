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

def Cdecision_tree_classifier(train_x, train_y, test_x, test_y, max_leaf):
    from sklearn import tree
    model = tree.DecisionTreeClassifier(max_leaf_nodes=max_leaf)
    model.fit(train_x, train_y)
    T = model.score(test_x, test_y)
    total_nodes = model.tree_.node_count
    n_leaf_nodes = model.tree_.n_leaves  # Number of leaf nodes
    n_internal_nodes = total_nodes - n_leaf_nodes
    total_edges = n_internal_nodes * 2
    
    return {'model': model, 'accuracy': T, 'total_edges': total_edges}


def Cdecision_tree_regressor(train_x, train_y, test_x, test_y, max_leaf):
    from sklearn import tree
    model = tree.DecisionTreeRegressor(max_leaf_nodes=max_leaf)
    
    model.fit(train_x, train_y)
    T = model.score(test_x, test_y)
    total_nodes = model.tree_.node_count
    n_leaf_nodes = model.tree_.n_leaves  # Number of leaf nodes
    n_internal_nodes = total_nodes - n_leaf_nodes
    total_edges = n_internal_nodes * 2
    
    return {'model': model, 'accuracy': T, 'total_edges': total_edges}


# Multinomial Naive Bayes Classifier
def naive_bayes_classifier(train_x, train_y):
    from sklearn.naive_bayes import MultinomialNB
    model = MultinomialNB(alpha=0.01)
    model.fit(train_x, train_y)
    accuracy = model.score(Xtest, Ytest)
    return accuracy


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


# 　 Classifier
def random_forest_classifier(train_x, train_y,test_x,test_y):
    from sklearn.ensemble import RandomForestClassifier
    model = RandomForestClassifier(n_estimators=8)
    model.fit(train_x, train_y)
    accuracy = model.score(test_x, test_y)
    return [model,accuracy]


# # Decision Tree Classifier
# def decision_tree_classifier(train_x, train_y):
#     from sklearn import tree
#     model = tree.DecisionTreeClassifier()
#     model.fit(train_x, train_y)
#     return model
# Decision Tree Classifier
def decision_tree_classifier(train_x, train_y,test_x,test_y):
    from sklearn import tree
    model = tree.DecisionTreeClassifier()
    model.fit(train_x, train_y)
    accuracy = model.score(test_x, test_y)
    return [model,accuracy]

# Visual decision Tree Classifier
def visual_decision_tree_classifier(train_x, train_y, test_x, test_y, class_names, feature_names):
    from sklearn import tree
    import matplotlib.pyplot as plt
    import uuid

    model = tree.DecisionTreeClassifier(max_depth=10, min_samples_split=10, min_samples_leaf=10)
    model.fit(train_x, train_y)
    accuracy = model.score(test_x, test_y)
    
    plt.figure(figsize=(15,10))
    tree.plot_tree(model, 
                   filled=True, 
                   rounded=True, 
                   class_names=class_names, 
                   feature_names=feature_names)
    
    # Generate unique filename
    unique_id = uuid.uuid4()
    img_filename = f"DTimg/decision_tree_{unique_id}.png"
    
    # Save the figure
    plt.savefig(img_filename, format='png', dpi=300)
    plt.close()
    
    return model, accuracy, img_filename

# GBDT(Gradient Boosting Decision Tree) Classifier
def gradient_boosting_classifier(train_x, train_y,test_x,test_y):
    from sklearn.ensemble import GradientBoostingClassifier
    model = GradientBoostingClassifier(n_estimators=200)
    model.fit(train_x, train_y)
    accuracy = model.score(test_x, test_y)
    return [model,accuracy]


# SVM Classifier
def svm_classifier(train_x, train_y,test_x,test_y):
    from sklearn.svm import SVC
    model = SVC(kernel='rbf', probability=True)
    model.fit(train_x, train_y)
    accuracy = model.score(test_x, test_y)
    return [model,accuracy]


# SVM Classifier using cross validation
def svm_cross_validation(train_x, train_y, test_x, test_y):
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
    accuracy = model.score(test_x, test_y)
    return [model, accuracy]


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

def test_print(url):
    print(url)

def test_ai(url):
    data = pd.read_csv(url)

    # data = pd.read_csv("./v2_chocolateData.csv")

    # url = "./v2_chocolateData.csv"
    # data = pd.read_csv(url)

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

def acc(str):
    data = pd.read_csv("./abc2.csv")
    a=[]
    sttt=str
    strlist = sttt.split('@%&')
    for value in strlist:
        a.append(value)

    name = []
    a[0] = a[0].strip(',')
    strlist = a[0].split(',')
    for value in strlist:
        name.append(value)

    print(name)
    feature = data[name]
    target = data[['a35']]

    Xtrain, Xtest, Ytrain, Ytest = train_test_split(feature, target, test_size=0.3, random_state=420)

    model_DTC = DTC(random_state=25)
    model_DTC = model_DTC.fit(Xtrain, Ytrain)
    accuracy = model_DTC.score(Xtest, Ytest)
    return accuracy

def acc2(str):
    data = pd.read_csv("./abc2.csv")
    a=[]
    sttt=str
    strlist = sttt.split('@TGT:targetis@')
    for value in strlist:
        a.append(value)

    train = []
    a[0] = a[0].strip(',')
    strlist = a[0].split(',')
    for value in strlist:
        train.append(value)

    tgt = a[1]

    print(train)
    print(tgt)
    feature = data[train]
    target = data[tgt]

    Xtrain, Xtest, Ytrain, Ytest = train_test_split(feature, target, test_size=0.3, random_state=420)

    model_DTC = DTC(random_state=25)
    model_DTC = model_DTC.fit(Xtrain, Ytrain)
    accuracy = model_DTC.score(Xtest, Ytest)
    return accuracy

def acc3(str):
    # data = pd.read_csv("./abc2.csv")
    # datatrue = pd.read_csv("./v2_chocolateData.csv")
    # datatrue = pd.read_csv("./Sta2.csv")
    b=[]
    sttt=str
    strlist = sttt.split('@TGT:targetis@')
    for value in strlist:
        b.append(value)

    a=[]
    stt=b[0]
    strlist = stt.split('@%&')
    for value in strlist:
        a.append(value)

    train = []
    tdata = []
    a[0] = a[0].strip(',')
    strlist = a[0].split(',')
    for value in strlist:
        train.append(value)
    
    a[1] = a[1].strip('#')
    strlist = a[1].split('#')
    for value in strlist:
        tdata.append(value)

    for a1 in range(0,len(tdata)):
        tdata[a1]=tdata[a1].replace('[','')
        tdata[a1]=tdata[a1].replace(']','')

    TMP={}

    for a2 in range(0,len(tdata)):
        tmp = list(tdata[a2].split(','))
        for b1 in range(0,len(tmp)):
            tmp[b1] = float(tmp[b1])
        print(tmp)
        # print(type(tmp[0]))
        print(train[a2])
        TMP[train[a2]]=tmp

    c=[]
    st=b[1]
    strlist = st.split('@%&')
    for value in strlist:
        c.append(value)

    gdata = c[1]
    print('type is:')
    print(type(gdata))
    gdata = gdata.replace('[','')
    gdata = gdata.replace(']','')

    TMP2={}
    tmp2 = list(gdata.split(','))
    for b2 in range(0,len(tmp2)):
        tmp2[b2] = float(tmp2[b2])
    print(tmp2)
    
    tgt = c[0]
    TMP2[tgt]=tmp2
    print(train)
    print(tgt)
    dataframefeature=pd.DataFrame.from_dict(TMP)#feature
    dataframetarget=pd.DataFrame.from_dict(TMP2)#target


    # feature = datatrue[train]
    # target = datatrue[tgt]
    # Xtrain, Xtest, Ytrain, Ytest = train_test_split(feature, target, test_size=0.3, random_state=420)

    Xtrain, Xtest, Ytrain, Ytest = train_test_split(dataframefeature, dataframetarget, test_size=0.3, random_state=420)
    
    model_DTC = DTC(random_state=25)
    model_DTC = model_DTC.fit(Xtrain, Ytrain)
    accuracy = model_DTC.score(Xtest, Ytest)
    result=[]
    result.append(tgt)
    result.append(accuracy)
    result.append(train)
    result.append('DT')
    return result    

if __name__ == '__main__':
    data = pd.read_csv("./v2_chocolateData.csv")
    print(data.head())
    print(data.shape)
    data2 = pd.read_csv("./v2_chocolateData.csv")
    feature = data[['Conching_time', 'conching_temperature', 'coca_melting_temperature', 'coca_melting_rotate_speed',
                    'pump1_Flow_rate', 'tempering_machine_time', 'pump2_temperature', 'pump3_pressure',
                    'tempering_machine_temperature', 'moulding_machine_time', 'Sugar_Mixer_temperature',
                    'moulding_machine_temperature', 'melting_tank_time', 'pump2_Flow_rate', 'pump3_Flow_rate', 'color',
                    'hardness', 'shape', 'glossiness']]
    target = data2[['passed']]

    # split data for train and test
    Xtrain, Xtest, Ytrain, Ytest = train_test_split(feature, target, test_size=0.3, random_state=420)
    
    model_DTC = DTC(random_state=25)
    model_DTC = model_DTC.fit(Xtrain, Ytrain)
    accuracy = model_DTC.score(Xtest, Ytest)
    print(accuracy)
    print(type(target))
    print(type(feature))
    print(feature)