import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  ActionPurchaseGet,
  ActionPurchaseGetSuccess,
  ActionPurchaseGetError,
  PurchaseActionTypes
} from './purchases.action';
import { PurchaseService } from './purchases.service';

@Injectable()
export class PurchaseEffects {
  constructor(
    private actions$: Actions<Action>,
    private service: PurchaseService
  ) {}

  @Effect()
  getPurchases = this.actions$.pipe(
    ofType<ActionPurchaseGet>(PurchaseActionTypes.GET_PURCHASE),
    switchMap((action: ActionPurchaseGet) =>
      this.service.getAll().pipe(
        map(purchases => new ActionPurchaseGetSuccess({ purchases })),
        catchError(error => of(new ActionPurchaseGetError({ error })))
      )
    )
  );
}
