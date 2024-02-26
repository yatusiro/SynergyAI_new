import irisDataset from 'ml-dataset-iris';
import { DecisionTreeClassifier as DTClassifier } from 'ml-cart';

const trainingSet = irisDataset.getNumbers();
const predictions = irisDataset
    .getClasses()
    .map((elem) => irisDataset.getDistinctClasses().indexOf(elem));

const options = {
    gainFunction: 'gini',
    maxDepth: 10,
    minNumSamples: 3,
};

const classifier = new DTClassifier(options);
classifier.train(trainingSet, predictions);
const result = classifier.predict(trainingSet);