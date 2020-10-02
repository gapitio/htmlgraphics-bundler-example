import createSeries from './series';

window.data = {
  state: LoadingState.Done,
  series: [
    createSeries(codeData.sidebar.totalCooling.metric, 1000),
  ],
};
