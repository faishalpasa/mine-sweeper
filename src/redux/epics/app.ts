import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'

import {
  APP_BOARD_DATA_FETCH,
  appBoardDataFetchFailure,
  appBoardDataFetchSuccess
} from 'redux/reducers/app'

import { COMMENT_GET } from 'constants/endpoint'

const dummyState =
  '[[{"id":1,"isBomb":false,"isRevealed":true,"isFlagged":false,"bombDetected":1,"positionX":0,"positionY":0},{"id":2,"isBomb":false,"isRevealed":true,"isFlagged":false,"bombDetected":1,"positionX":1,"positionY":0},{"id":3,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":0,"positionX":2,"positionY":0},{"id":4,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":0,"positionX":3,"positionY":0},{"id":5,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":0,"positionX":4,"positionY":0}],[{"id":6,"isBomb":true,"isRevealed":false,"isFlagged":false,"bombDetected":1,"positionX":0,"positionY":1},{"id":7,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":2,"positionX":1,"positionY":1},{"id":8,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":0,"positionX":2,"positionY":1},{"id":9,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":0,"positionX":3,"positionY":1},{"id":10,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":0,"positionX":4,"positionY":1}],[{"id":11,"isBomb":true,"isRevealed":false,"isFlagged":false,"bombDetected":0,"positionX":0,"positionY":2},{"id":12,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":2,"positionX":1,"positionY":2},{"id":13,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":0,"positionX":2,"positionY":2},{"id":14,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":1,"positionX":3,"positionY":2},{"id":15,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":1,"positionX":4,"positionY":2}],[{"id":16,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":2,"positionX":0,"positionY":3},{"id":17,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":3,"positionX":1,"positionY":3},{"id":18,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":1,"positionX":2,"positionY":3},{"id":19,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":2,"positionX":3,"positionY":3},{"id":20,"isBomb":true,"isRevealed":false,"isFlagged":false,"bombDetected":0,"positionX":4,"positionY":3}],[{"id":21,"isBomb":true,"isRevealed":false,"isFlagged":false,"bombDetected":0,"positionX":0,"positionY":4},{"id":22,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":2,"positionX":1,"positionY":4},{"id":23,"isBomb":true,"isRevealed":false,"isFlagged":false,"bombDetected":0,"positionX":2,"positionY":4},{"id":24,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":2,"positionX":3,"positionY":4},{"id":25,"isBomb":false,"isRevealed":false,"isFlagged":false,"bombDetected":1,"positionX":4,"positionY":4}]]'

export const appBoardDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_BOARD_DATA_FETCH),
    mergeMap((action) =>
      api({
        endpoint: COMMENT_GET,
        host: 'https://jsonplaceholder.typicode.com',
        query: {
          postId: action.payload
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const data = {
            columns: 12,
            rows: 12,
            mines: 5,
            state: ''
          }
          return of(appBoardDataFetchSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: 'Gagal mendapatkan data'
          }
          return of(appBoardDataFetchFailure(error))
        })
      )
    )
  )
