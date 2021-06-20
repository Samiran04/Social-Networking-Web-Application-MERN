import { SEARCH_RESULT_SUCCESS } from './actionTypes';
import { APIUrls } from '../helpers/getUrl';

function searchResult(results) {
  return {
    type: SEARCH_RESULT_SUCCESS,
    results,
  };
}

export function searchResultSuccess(searchName) {
  const url = APIUrls.searchUrl(searchName);

  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(searchResult(data.data.users));
        }
      });
  };
}
