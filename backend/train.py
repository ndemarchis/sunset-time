import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import warnings

import tensorflow.keras as tf

# first neural network with keras tutorial
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.callbacks import TensorBoard, History

EPOCHS = 500
BATCH_SIZE = 12

weather_df = pd.read_csv("./data/randomized.csv") 

from sklearn.model_selection import train_test_split
# Xtrain, Xtest = train_test_split(weather_df, test_size=0.1, random_state=1)
# print(f"Shape of train data: {Xtrain.shape}")
# print(f"Shape of test data: {Xtest.shape}")

Xdf = weather_df.drop(columns=["id2", "location", "airportCode", "date", 'conditions', 'sunsetTime', 'weatherTime', "goodSunset"])
Ydf = weather_df["goodSunset"]

# print(Xdf)
# print(Ydf)

Xtrain, Xtest = train_test_split(Xdf, test_size=0.1, random_state=1)
Ytrain, Ytest = train_test_split(Ydf, test_size=0.1, random_state=1)

XtrainNp = np.asarray(Xtrain.values).astype('float32')
YtrainNp = np.asarray(Ytrain.values).astype('float32')
XtestNp = np.asarray(Xtest.values).astype('float32')
YtestNp = np.asarray(Ytest.values).astype('float32')

# print(XtrainNp)

# define the keras model
model = Sequential()
model.add(Dense((round(len(XtrainNp[0]) * 1.5)), input_dim=(len(XtrainNp[0])), activation='relu'))
model.add(Dense((len(XtrainNp[0])), activation='relu'))
model.add(Dense(1, activation='sigmoid'))

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

history = History()
history = model.fit(XtrainNp, YtrainNp, epochs=EPOCHS, batch_size=BATCH_SIZE)

_, accuracy = model.evaluate(XtrainNp, YtrainNp)
print('Accuracy: %.2f' % (accuracy*100))

# make class predictions with the model
predictions = model.predict_classes(XtestNp)
# summarize the first 5 cases
for i in range(len(predictions)):
	print('%s => %d (expected %d)' % (XtestNp[i].tolist(), predictions[i], YtestNp[i]))

model.save('backend/NNModel')

plt.figure(figsize=(5,5))
plt.plot(history.epoch, history.history["accuracy"], label = "Training")
plt.plot(history.epoch, history.history["loss"], label = "Loss")
plt.xlabel("Epochs")
plt.ylabel("Accuracy")
plt.legend()
plt.xlim([0, max(history.epoch)])
plt.ylim([0, 1])
plt.show()  

