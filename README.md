# JavaScript wrapper for the WP Engine API

A simple JavaScript wrapper for getting data from your WP Engine installs using their API.

## Installing

Using npm (coming soon):

```bash
$ npm install axios
```

## Import

```js
import WpeApi from 'dc-wpe-js-api';
```

## Initialize constructor

**Params**

-   `user` **{String}**: The WP Engine API User.
-   `pass` **{String}**: The WP Engine API Password/key.

You should put these variables in a .ENV file!

```js
const wpe = new WpeApi(user, pass);
```

## API

### [.id](index.js#L25)

Get WP Engine install ID by `name`.

**Params**

-   `name` **{String}**: The WP Engine install Name.
-   `returns` **{String}**: Returns the WP Engine install ID.

**Example**

```js
wpe.id(name);
```

### [.name](index.js#L40)

Get WP Engine install name by `id`.

**Params**

-   `id` **{String}**: The WP Engine install ID.
-   `returns` **{String}**: Returns the WP Engine install name.

**Example**

```js
wpe.name(id);
```

### [.domains](index.js#L51)

Get WP Engine install domains by `id`.

**Params**

-   `id` **{String}**: The WP Engine install ID.
-   `returns` **{Array}**: Returns the WP Engine install domains.

**Example**

```js
wpe.domains(id);
```

### [.phpVersion](index.js#L65)

Get the PHP version of the WP Engine install by `id`.

**Params**

-   `id` **{String}**: The WP Engine install ID.
-   `returns` **{String}**: Returns the PHP version of the WP Engine install.

**Example**

```js
wpe.phpVersion(id);
```

### [.status](index.js#L76)

Get the status of the WP Engine install by `id`.

**Params**

-   `id` **{String}**: The WP Engine install ID.
-   `returns` **{String}**: Returns the status of the WP Engine install.

**Example**

```js
wpe.status(id);
```

### [.cname](index.js#L87)

Get the CNAME of the WP Engine install by `id`.

**Params**

-   `id` **{String}**: The WP Engine install ID.
-   `returns` **{String}**: Returns the CNAME of the WP Engine install.

**Example**

```js
wpe.cname(id);
```

### [.environment](index.js#L98)

Get the WP Engine install environment by `id`.

**Params**

-   `id` **{String}**: The WP Engine install ID.
-   `returns` **{String}**: Returns the WP Engine install environment.

**Example**

```js
wpe.environment(id);
```

### [.primaryDomain](index.js#L109)

Get WP Engine primary install domain by `id`.

**Params**

-   `id` **{String}**: The WP Engine install ID.
-   `returns` **{String}**: Returns the WP Engine install primary domain.

**Example**

```js
wpe.primaryDomain(id);
```

### [.isMultisite](index.js#L120)

Check if WP Engine install is a multisite environment by `id`.

**Params**

-   `id` **{String}**: The WP Engine install ID.
-   `returns` **{Boolean}**: Returns boolean true/false depending on if install is a multisite environment.

**Example**

```js
wpe.isMultisite(id);
```

### [.getWpeApi](index.js#L131)

Get custom WP Engine data.

**Params**

-   `...args` **{Any}**: Api arguments. Docs: https://wpengineapi.com.
-   `returns` **{Array}**: Returns api data.

**Examples**

```js
wpe.getWpeApi('installs', { limit: 10 })
	.then((res) => {
		console.log(res);
	})
	.catch((err) => console.error(`Error: ${err}`));
```

```js
wpe.getWpeApi('installs', id, 'domains')
	.then((res) => {
		console.log(res);
	})
	.catch((err) => console.error(`Error: ${err}`));
```
