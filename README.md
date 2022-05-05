# slack.localize

# Use case
```mermaid
flowchart LR
    Start[User needs <br>an exchange <br>rate]
    Start --> A
    A["Enter /exchange command<br> with or without <br>optional parameters"] -->
    B{"Valid parameters <br>included?"}
    B-- Yes -->C[Send a message <br>to the current <br>channel with the <br>exhange rate]
    B-- No --> D[Open Exchange Rate <br>Calculator Modal] 
    D --> E[User selects <br>channel, amount, <br>and currencies]
    E --> F[Submit]
    F --> H[Send a message <br>to selected <br>channel with the <br>exchange rate]
    E --> G[Cancel]
  ```
