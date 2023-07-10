import React from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Card } from 'react-bootstrap';

export interface PropsPopularSpotCardComponent {
  imgUrl: string;
  width?: number;
  height?: number;
  handleClick?: () => any;
}

const PopularSpotCardComponent: React.FunctionComponent<
  PropsPopularSpotCardComponent
> = ({ imgUrl, width = 579, height = 384, handleClick }) => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
  const isDesktop = screenClass === 'xl';

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  const containerStyles = {
    width: width,
    height: height,
  };

  return (
    <div
      className={styles.flip_container}
      style={containerStyles}
      onClick={handleClick}
    >
      <div className={styles.flipper} style={containerStyles}>
        <div className={styles.front} style={containerStyles}>
          <Card style={containerStyles} className="border-0">
            <Card.Img variant="top" src={imgUrl} />
          </Card>
        </div>
        <div className={styles.back} style={containerStyles}>
          <Card style={containerStyles} className="border-0">
            {/*TODO: You can customize this section.*/}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PopularSpotCardComponent;
