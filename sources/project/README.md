# Project 

This project is meant to be worked on in group of 3 to 4 people max. The objective is not only to succeed in delivering features but mostly in the ways features are coded and implemented: i.e. focus on the craft practices
- tdd
- peer / mob programmig
- clean code
- git conventional commit + pull/merge requests
- professionalism: challenge crappy specs 
Work can be done in french or in english in a github repository. 

Guidelines: 
- code is written using TDD
    - a commit per TDD cycle (red, green, refactoring)
- pair programming is considered for each task
- clean code conventions 
    - defined in a file CONVENTIONS.md at the root of the project
    - updated with each story and new situations faced
    - are part of the pull/merge request
- for each "user story"
    - a pull/merge request per "User Story"

## Backlog 

The following stories are to be developped sequentially. 
The general idea is to make an API that will store and serve translations. 

- story 1 - store new key and related translations
- story 2 - update existing key to add or update translations
- story 3 - get translation for a key and a language
- story 4 - get fallback translation when translation is not available
- optional story 5 - create key group
- optional story 6 - get translation group for a given language

### User Story 1

As an translation API user, I need to record translations for a given key so that I can start having a localization corpus for my software. 

Acceptance criteria
- Given a `PUT` call to `http://localhost:8080/api/words`, when a payload with appropriate data is provided, then a new word resource is created with the payload and the server returns the ressource with a http code 201. 
- Given a `PUT` call to `http://localhost:8080/api/words`, when the payload is not defined or properly defined, a 406 error is returned

Example payload data
```http
PUT http://localhost:8080/api/words
{
    "w":"key-hello",
    "t":[
        {"language":"en", "translation":"hello"},
        {"language":"fr", "translation":"bonjour"},
        {"language":"it", "translation":"ciao"},
    ]
}
```
Repsonse data
```http
HTTP/1.1 201 Created
{
    "word":"key-hello",
    "translations":[
        {"language":"en", "translation":"hello"},
        {"language":"fr", "translation":"bonjour"},
        {"language":"it", "translation":"ciao"},
    ],
    "url":"http://localhost:8080/api/words/key-hello"
}
```

### User Story 2

As an translation API user, I need to update translations for a given key so that I can enrich my localization corpus for my software. 

Acceptance criteria
- Given a `PUT` call to `http://localhost:8080/api/words/<key>`, when a payload with appropriate data is provided, then a new word resource is updated with the payload and the server returns the ressource with a http code 200. 
- Given a `PUT` call to `http://localhost:8080/api/words/<key>`, when the payload is not defined or properly defined, a 406 error is returned
- Given a `PUT` call to `http://localhost:8080/api/words/<key>`, when the key does not exist, then the API returns an error 404

Example payload data
```http
PUT http://localhost:8080/api/words/key-hello
{
    "w":"key-hello",
    "t":[
        {"language":"en", "translation":"helloOo"},
        {"language":"zh", "translation":"ni hao"}
    ]
}
```
Repsonse data
```http
HTTP/1.1 200 Ok
{
    "word":"key-hello",
    "translations":[
        {"language":"en", "translation":"helloOo"},
        {"language":"fr", "translation":"bonjour"},
        {"language":"it", "translation":"ciao"},
        {"language":"zh", "translation":"ni hao"}
    ],
    "url":"http://localhost:8080/api/words/key-hello"
}
```

### User Story 3

As an translation API user, I need to access translations for a given key so that I can request localization for a given key to inject in my software. 

Acceptance criteria
- Given a `GET` call to `http://localhost:8080/api/words/<key>`, then I get the whole translation resource
- Given a `GET` call to `http://localhost:8080/api/words/<key>?lang=<language>`, then I get the translation resource filtered based on language
- Given a `GET` call to `http://localhost:8080/api/words/<key>`, then I get a 404 error when the translation does not exist

Example payload data

```http
GET http://localhost:8080/api/words/key-hello
```
returns 
```http
HTTP/1.1 200 Ok
{
    "w":"key-hello",
    "t":[
        {"language":"en", "translation":"hello"},
        {"language":"fr", "translation":"bonjour"},
        {"language":"fr-ca", "translation":"Bon matin"},
        {"language":"it", "translation":"ciao"},
    ]
}

```http
GET http://localhost:8080/api/words/key-hello?lang=fr
```
returns 
```http
HTTP/1.1 200 Ok
{
    "w":"key-hello",
    "t":[
        {"language":"fr", "translation":"bonjour"},
        {"language":"fr-ca", "translation":"Bon matin"}
    ]
}
```

### User Story 4


As an translation API user, I need to have a translation value for a given key even when I don't have a translation so my software can still display data. 

Acceptance criteria
- Given a `GET` call to `http://localhost:8080/api/words/<key>?lang=<language>`, and I don't have any fallback translation, then I will get a "default" value with the key as value
- Given a `GET` call to `http://localhost:8080/api/words/<key>?lang=<language>`, and I have at least `en` fallback translation, then I will get the "en" language translation.

Example payload data

```http
GET http://localhost:8080/api/words/key-hello?lang="jp"
```
returns 
```http
HTTP/1.1 200 Ok
{
    "w":"key-hello",
    "isFallback":true,
    "t":[
        {"language":"en", "translation":"hello"}
    ]
}
```


```http
GET http://localhost:8080/api/words/key-hello?lang="ma"
```
returns 
```http
HTTP/1.1 200 Ok
{
    "w":"key-hello",
    "isFallback":true,
    "t":[
        {"language":"key", "translation":"key-hello"}
    ]
}
```

### json examples

```json
// PUT http://localhost:8080/api/words
{
    "w":"key-hello",
    "t":[
        {"language":"en", "translation":"hello"},
        {"language":"fr", "translation":"bonjour"},
        {"language":"it", "translation":"ciao"},
    ]
}
```

```json
// GET http://localhost:8080/api/words/hello
{
    "word":"hello",
    "translations":[
        {"language":"en", "translation":"hello"},
        {"language":"fr", "translation":"bonjour"},
        {"language":"it", "translation":"ciao"},
    ],
    "url":"http://localhost:8080/api/words/hello"
}

```

```json
// final group
// POST http://localhost:8080/api/groups
{
    "language":"en",
    "collection":["hello","world"]
}
```

```json
// final group
// GET http://localhost:8080/api/groups/8580c4f2-8dcd-4533-aded-1f028b4410ce?lang=fr-fr
{
    "group":"8580c4f2-8dcd-4533-aded-1f028b4410ce",
    "language":"fr-fr",
    "collection":["hello", "world"],
    "models":{
        "hello":{
            "t":"bonjour"
            "fallback":null
        },
        "world":{
            "t":"world",
            "fallback":"en"
        }
    },
    "url":"http://localhost:8080/api/groups/8580c4f2-8dcd-4533-aded-1f028b4410ce?lang=fr-fr"
}
```

```json
// GET http://localhost:8080/api/missing-translations/fr

{
    "language":"fr",
    "collection":["world"],
    "models":{
        "world":{
            "url":"http://localhost:8080/api/words/world"
        }
    },
    "url":"http://localhost:8080/api/missing-translations/<language>"
}
```
