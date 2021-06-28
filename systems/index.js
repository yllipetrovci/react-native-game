let isFingerInCircle = false;
const RADIUS = 40;

_isMatchingWithTouchEntity = (touchEvent, secondEntity, radiusOfSecondEntity) => {  
  const touchPosX = touchEvent.pageX;
  const touchPosY = touchEvent.pageY;
  const circlePosX = secondEntity.position[0];
  const circlePosY = secondEntity.position[1];


  const isFingerMatchingPositionX = ((touchPosX < circlePosX - radiusOfSecondEntity) || (touchPosX < circlePosX + radiusOfSecondEntity))
  const isFingerMatchingPositionY = ((touchPosY < circlePosY + radiusOfSecondEntity) || (touchPosY < circlePosY - radiusOfSecondEntity));

  return isFingerMatchingPositionX && isFingerMatchingPositionY;
}

const MoveFinger = (entities, { touches }) => {
  
  if (touches?.length === 0) return entities;
  
  const fingerEntity = entities.finger;
  const onStartTouches = touches.filter(t => t.type === "start");

  if (onStartTouches.length > 0) {
    const touchEvent = onStartTouches[0]?.event;

    if (this._isMatchingWithTouchEntity(touchEvent, fingerEntity, RADIUS)) {
      isFingerInCircle = true;
    }
  }

  const onEndTouches = touches.filter(t => t.type === "end");

  if (onEndTouches.length > 0) {
    isFingerInCircle = false;
  }

  touches.filter(t => t.type === "move").forEach(t => {
    if (!fingerEntity?.position && !isFingerInCircle) return;

    fingerEntity.position = [
      fingerEntity.position[0] + t.delta.pageX,
      fingerEntity.position[1] + t.delta.pageY
    ];
  });

  return entities;
};

let cacheEntityKeys = [];

let cacheFingerEntity = null;


const MatchBacteries = (entities, { touches,dispatch }) => {
  
  if(touches.length === 0) return entities;

  const fingerEntity = entities.finger;
  const fingerPosX = fingerEntity.position[0];
  const fingerPosY = fingerEntity.position[1];
  
  
  if (cacheEntityKeys.length === 0) {
    cacheEntityKeys = Object.keys(entities);
  }

  if (cacheEntityKeys.length <= 1) {
    dispatch('end-game');
    cacheEntityKeys = [];
    return entities;
  }

  let returnNewEntities = { finger: entities.finger };

  cacheEntityKeys.forEach((key) => {
    if (key !== 'finger') {
      const currentEntity = entities[key];
      const bacteriaPosX = currentEntity.position[0];
      const bacteriaPosY = currentEntity.position[1];

      const isEntitesMatchingPosX = ((fingerPosX < bacteriaPosX - RADIUS) || (fingerPosX < bacteriaPosX + RADIUS));
      const isEntitesMatchingPosY = ((fingerPosY < bacteriaPosY + RADIUS) || (fingerPosY < bacteriaPosY - RADIUS));

      if (!(isEntitesMatchingPosX && isEntitesMatchingPosY)) {
        returnNewEntities = { [key]: entities[key], ...returnNewEntities };
      } else {
        cacheEntityKeys = cacheEntityKeys.filter(cacheKey => cacheKey !== key);
        dispatch("update-score");
      }
    }
  })

  cacheFingerEntity = fingerEntity;

  return returnNewEntities;

};

export { MoveFinger, MatchBacteries };