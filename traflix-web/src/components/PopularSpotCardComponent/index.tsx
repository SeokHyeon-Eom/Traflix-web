import React, { useState, useEffect, useCallback } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import stylesMobileDefault from './MobileDefault.module.scss';
import { CardDataType } from '../../types/CardCarouselDataType';

const PopularSpotCardComponent: React.FunctionComponent<CardDataType> = ({
  imgUrl,
  place,
  addr,
  info,
}) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';
  const styles = isDesktop ? stylesDesktopDefault : stylesMobileDefault;

  return (
    <div className={styles.card}>
      <img src={imgUrl} />
      <div className={styles.caption}>
        <p>{info}</p>
        <span>{place}</span>
        <p>{addr}</p>
      </div>
    </div>
  );
};

export default PopularSpotCardComponent;
