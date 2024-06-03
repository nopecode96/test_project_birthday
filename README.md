
# Novy Lavanda - Test Project 1

This project just test case for My 

Steps to running API:

    npm install
    npm run dev

## Acknowledgements

We have 9 End Point:

    01. Bulk Save Regions
    02. Get All Regions
    03. Input User Data
    04. Delete User
    05. Update User Detail 
    06. Get All User
    07. Get User Detail
    08. Birthday Notification Email
    09. Birthday Notification Email Backup


## API Reference

#### Insert sample regional

After can running npm, the first step you must to run this end point to insert Regional Data.

```http
  GET /regions/bulk
```

#### Get all regional

You can check city ID with this End Point.

```http
  GET /regions
```


#### Post User Data

```http
  POST /users
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `email`     | `string` | **Required**.                     |
| `firstName` | `string` | **Required**.                     |
| `lastName`  | `string` | **Required**.                     |
| `birthdate` | `string` | **Required**.                     |
| `cityId`    | `string` | Reference Regional City ID        |



#### DELETE User

```http
  DELETE /users/:id
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `id`        | `string` | **Required**.                     |


#### PUT User Update

```http
  PUT /users/:id
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `id`        | `string` | **Required**.                     |


#### GET All User

```http
  GET /users
```


#### GET User Detail

```http
  GET /users/:id
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `id`        | `string` | **Required**.                     |


#### Birthday Notification Email
  This is main End Point to send notification email into user. We can use **Cron Job** on Server everyday at 09 AM to hit this End Point.

```http
  GET /mail-send
```

#### Birthday Notification Email Backup
  This is backup End Point to send notification email into user if mail server down. We can use **Cron Job** on Server everyday at 10AM / 12PM / 15PM to hit this End Point.

```http
  GET /mail-send/backup
```

