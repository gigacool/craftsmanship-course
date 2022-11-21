# Project 

This project is meant to be worked on in group of 3 to 4 people max. The objective is not only to succeed in delivering features but mostly in the ways features are coded and implemented. 

Expectations: 
- code is written using TDD
    - a commit per iteration (red, green, refactoring)
- pair programming is considered for each task
- clean code conventions 
    - are defined
    - and reviewed during programming / code review
- each task is pushed through a merge request
    - conventional commit practice is used

## Backlog 

The following stories are to be developped in the given order (one after another). 

The general idea is to make an API that will store and serve translations. 

- story 1 - store new word and translation
- story 2 - get word translation
- story 3 - get fallback translation 
- story 4 - create words group
- story 5 - get words group for a given language


### json samples

```json

// POST http://localhost:8080/api/words
{
    "w":"hello",
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

### U0

As an API consumer, I can store a word translation so that I can get a translation corpus for words

Acceptance criteria 
- using PUT http request, I can set a language and word resource and provide one translation for a given key 
- providing new translation key will update word translation (add new translation and preserve other translations)
- providing new value for translation will add new translation to word
- when a translation is added, it's url resource is added in the given language resources

resource url `http://localhost:8080/api/word/<word>`

```
// example request
PUT /api/key/bonjour
payload { "fr":"bonjour", "en":"good morning" }
```
returns
```
// response
status 200
payload { "fr": "bonjour", "en":"good morning", "href":"http://localhost:8080/api/keys/<guid>"}
```


### U1

As an API consumer, I can get a word and its traduction in a given language. 

Acceptance criteria
- using GET http request, we can specify a word and get it's available translations
- using a query parameter `lang="language code"`, I can get only translation related to language code (ex. en, en-us, fr, fr-ca)



