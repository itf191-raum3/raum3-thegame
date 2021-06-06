import { CircularProgress } from '@material-ui/core';

export function Loading() {
  return <CircularProgress color="primary" style={{ height: '10vmin', width: '10vmin' }} />;
}
