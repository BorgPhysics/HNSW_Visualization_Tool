import { FederIndex, FederLayout } from '../dist/index.js';
import {
  hnswIndexFilePath,
  hnswSource,
  outputDirPath,
} from './config.js';
import fs from 'fs';
import path from 'path';

export const test_federLayout_hnsw = async () => {
  const federIndex = new FederIndex(hnswSource);

  const arrayBuffer = fs.readFileSync(path.join("./test", hnswIndexFilePath)).buffer;
  federIndex.initByArrayBuffer(arrayBuffer);

  const federLayout = new FederLayout(federIndex);
  
  await test_getVisData_overview(federLayout);
  await test_getVisData_search(federLayout);
};

const test_getVisData_overview = async (federLayout) => {
  const visDataOverview = await federLayout.getVisData({
    actionType: 'overview',
    // actionData: {},
    // viewType: 'default',
    layoutParams: {
      width: 1000,
      height: 600,
    }
  })

  fs.writeFileSync(
    outputDirPath + 'FederLayout_visData_hnsw_overview.json',
    JSON.stringify(visDataOverview, null, 2)
  );
}

const test_getVisData_search = async (federLayout) => {
  const testVector = Array(512)
    .fill(0)
    .map((_) => Math.random());

  const testSearchParams = {
    k: 4,
    ef: 6,
    nprobe: 5,
  };

  const visDataOverview = await federLayout.getVisData({
    actionType: 'search',
    actionData: {
      target: testVector,
      searchParams: testSearchParams,
    },
    viewType: 'default',
    layoutParams: {
      width: 1000,
      height: 600,
    }
  })

  fs.writeFileSync(
    outputDirPath + 'FederLayout_visData_hnsw_search.json',
    JSON.stringify(visDataOverview, null, 2)
  );
}