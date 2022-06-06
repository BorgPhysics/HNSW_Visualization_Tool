import { INDEX_TYPE } from 'Types';
import { initLoadingStyle, renderLoading } from './loading';
import HnswView from './HnswView';
import IvfflatView from './IvfflatView';

const viewHandlerMap = {
  [INDEX_TYPE.hnsw]: HnswView,
  [INDEX_TYPE.ivf_flat]: IvfflatView,
};

const defaultViewParams = {
  width: 1000,
  height: 600,
  canvasScale: 3,
};

export default class FederView {
  constructor({ domSelector, viewParams }) {
    this.domSelector = domSelector;
    this.viewParams = Object.assign({}, defaultViewParams, viewParams);

    this.viewHandler = null;

    this.initDom();
  }
  initDom() {
    const dom = document.createElement('div');
    this.dom = dom;
    const { width, height } = this.viewParams;
    const domStyle = {
      position: 'relative',
      width: `${width}px`,
      height: `${height}px`,
      // boxShadow: '0 0 5px #ccc',
      // borderRadius: '10px',
    };
    Object.assign(dom.style, domStyle);
    initLoadingStyle();
    renderLoading(this.dom, width, height);

    if (this.domSelector) {
      const domContainer = document.querySelector(this.domSelector);
      domContainer.appendChild(dom);
    }
  }
  initView({ indexType, indexMeta, getVectorById }) {
    if (indexType in viewHandlerMap) {
      this.view = new viewHandlerMap[indexType]({
        indexMeta,
        dom: this.dom,
        viewParams: this.viewParams,
        getVectorById,
      });
    } else throw `No view handler for ${indexType}`;
  }
  overview() {
    this.view.overview();
  }
  search({ searchRes, targetMediaUrl }) {
    this.view.search({ searchRes, targetMediaUrl });
  }

  switchSearchView(searchViewType) {
    try {
      this.view.switchSearchView(searchViewType);
    } catch (e) {
      console.log('Not Support', e);
    }
  }
}
