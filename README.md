# node-package-config
Node.js config loader based on package.json file.

Package.json file is useful to store env-related variables (such as server ports or other configurations).
This module will read the `NODE_ENV` env variable in order to get the current running environment.

*Note that the `development` environment must be present because is the default environment expected.*

The `package.json`file must be formatted like this
```
{
    "name": "your-package-name"
    "author": "This is You"
    ...
    "config": {
        "development": {
            port: 8080,
            db: {
                user: ...
                password: ...
            }
            
            
        },
        "production": {
            port: 80,
            db: {
                user: ...
                password: ...
            }
        },
        "another-env": {
            ... // your stuff.
        }
        
    }
}
```

Then you can load the config with a one-liner

```
var config = require('package-config').load();
server.listen(config.port);
```

If you want to load an alternate package.json-like config file you can type

`var config = require('package-config').load("/path/to/your/package/file");`