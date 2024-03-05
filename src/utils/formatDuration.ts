const formatDuration = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return duration;
}

export default formatDuration;