import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  AccountActionTypes,
  ActionAccountGetAccountInfos,
  ActionAccountGetAccountInfosSuccess,
  ActionAccountGetAccountInfosError,
  ActionAccountGetPersonalInfoLabels,
  ActionAccountGetPersonalInfoLabelsSuccess,
  ActionAccountGetPersonalInfoLabelsError,
  ActionAccountGetNotificationLabels,
  ActionAccountGetNotificationLabelsSuccess,
  ActionAccountGetNotificationLabelsError,
  ActionAccountGetPaymentInfo,
  ActionAccountGetPaymentInfoSuccess,
  ActionAccountGetPaymentInfoError
} from './account.actions';
import { AccountService } from './account.service';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions<Action>,
    private service: AccountService
  ) {}

  @Effect()
  getAccountInfos = this.actions$.pipe(
    ofType<ActionAccountGetAccountInfos>(AccountActionTypes.GET_ACCOUNT_INFOS),
    switchMap((action: ActionAccountGetAccountInfos) =>
      this.service.getAccountInfos().pipe(
        map(accounts => new ActionAccountGetAccountInfosSuccess({ accounts })),
        catchError(error =>
          of(new ActionAccountGetAccountInfosError({ error }))
        )
      )
    )
  );

  @Effect()
  getPersonalInfoLabels = this.actions$.pipe(
    ofType<ActionAccountGetPersonalInfoLabels>(
      AccountActionTypes.GET_PERSONAL_INFO_LABELS
    ),
    switchMap(() =>
      this.service.getPersonalInfoLabels().pipe(
        map(
          labels => new ActionAccountGetPersonalInfoLabelsSuccess({ labels })
        ),
        catchError(error =>
          of(new ActionAccountGetPersonalInfoLabelsError({ error }))
        )
      )
    )
  );

  @Effect()
  getNotificationLabels = this.actions$.pipe(
    ofType<ActionAccountGetNotificationLabels>(
      AccountActionTypes.GET_NOTIFICATION_LABELS
    ),
    switchMap(() =>
      this.service.getNotificationLabels().pipe(
        map(
          notificationLabels =>
            new ActionAccountGetNotificationLabelsSuccess({
              notificationLabels
            })
        ),
        catchError(error =>
          of(new ActionAccountGetNotificationLabelsError({ error }))
        )
      )
    )
  );

  @Effect()
  getPaymentInfo = this.actions$.pipe(
    ofType<ActionAccountGetPaymentInfo>(AccountActionTypes.GET_PAYMENT_INFO),
    switchMap(() =>
      this.service.getPaymentInfo().pipe(
        map(paymentInfo => new ActionAccountGetPaymentInfoSuccess(paymentInfo)),
        catchError(error => of(new ActionAccountGetPaymentInfoError({ error })))
      )
    )
  );
}
