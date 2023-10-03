import React, { Suspense } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import MapComponent from '../../components/MapComponent';
import LoadingComponent from '../../components/LoadingComponent';
import { MapCoordinateDataType } from '../../types/MapCoordinateDataType';
import testPath1 from '../../assets/strings/MapComponent/mockData';
import TravelScheduleComponent from '../../components/TravelScheduleCompoent';
import testData from '../../assets/string/travelCardComponent';
import TrainTestData from '../../assets/string/trainCardComponent';
import HeaderComponent from '../../components/HeaderComponent';
import ContentDetailModalComponent from '../../components/ContentDetailModalComponent';

const DirectionPage = () => {
  const { screenClass, content } = useRootData(
    ({ appStore, contentModal }) => ({
      screenClass: appStore.screenClass.get(),
      content: contentModal.content.get(),
    }),
  );
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  const testPath: MapCoordinateDataType[] = testPath1;
  const scheduleData = [testData, TrainTestData];

  return (
    <div className={styles.pageContainer}>
      <HeaderComponent />
      <div>
        <ContentDetailModalComponent />
      </div>
      <div className={styles.cardItemsContainer}>
        <Suspense fallback={<LoadingComponent />}>
          <TravelScheduleComponent schedule={scheduleData} />
        </Suspense>
      </div>
      <div className={styles.mapContainer}>
        <MapComponent pathCoordinates={testPath}></MapComponent>
      </div>
    </div>
  );
};

export default DirectionPage;
