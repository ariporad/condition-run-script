# semantic-release condition-run-script

[![npm version](https://badge.fury.io/js/%40semantic-release%2Fcondition-run-script.svg)](http://badge.fury.io/js/%40semantic-release%2Fcondition-run-script)
[![Build Status](https://travis-ci.org/semantic-release/condition-run-script.svg?branch=next)](https://travis-ci.org/semantic-release/condition-run-script)
[![Coverage Status](https://coveralls.io/repos/semantic-release/condition-run-script/badge.svg?branch=next&service=github)](https://coveralls.io/github/semantic-release/condition-run-script?branch=next)

[![Dependency Status](https://david-dm.org/semantic-release/condition-run-script/next.svg)](https://david-dm.org/semantic-release/condition-run-script/next)
[![devDependency Status](https://david-dm.org/semantic-release/condition-run-script/next/dev-status.svg)](https://david-dm.org/semantic-release/condition-run-script/next#info=devDependencies)

[![Join the chat at https://gitter.im/semantic-release/semantic-release](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/semantic-release/semantic-release?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
---

##Instructions

First, install it:

```bash
npm i -D @semantic-release/condition-run-script
```

Then add to your package.json

```json
{
	// blah blah blah
	"release": {
		"getLastRelease": {
			"path": '@semantic-release/condition-run-script',
			"script": "onlyReleaseOnFriday.sh"
		}
	}
}
```

Then you're done! If you still only want to release on travis:

```json
{
	// blah blah blah
	"release": {
		"getLastRelease": {
			"path": ["@semantic-release/condition-travis", "@semantic-release/condition-run-script"],
			"script": "onlyReleaseOnFriday.sh"
		}
	}
}
``` 