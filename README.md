# a4-http-authorization-interceptor
Angular 4+ Http Authorization Interceptor

# How-To
## Install
```
npm install a4-http-authorization-interceptor
```

## app.module.ts
1. Add ```HttpAuthorizationModule``` to imports of the ```app.module.ts```.

```typescript

...
import { HttpAuthorizationModule } from 'a4-http-authorization';
...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...,
    HttpAuthorizationModule,
    ...
  ],
  ...
})
```

## Inject the service
```typescript
constructor(private httpAuthorizationService: HttpAuthorizationService) { }
```

## Set the token's cookie name
```typescript
this.httpAuthorizationService.setTokenCookieName('oauth-cookie');
```

## Set Authroization Header Call Back
```typescript
this.httpAuthorizationService.setHttpAuthorizationCallback(req => {
  // your logic here

  return true; // return true to allow injector to inject the authorization header
               // return false and injector will not inject the authorization header
});
```

## Get Authorization Header
```typescript
const header = this.httpAuthorizationService.getAuthorizationHeader();
```
This will return ```Bearer <token>``` if cookie is found, otherwise it returns an empty string ('').