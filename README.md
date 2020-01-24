# Go builder

This action builds a golang program, parsing the output and adding annotations if there are any problems encountered during the build.

## Inputs

### `version-path`

The version path is used to refer to a version object in the code which is filled in during the link step. The version object contains

 * origin - the origin of the git repository that's being built
 * branch - the branch that's being built
 * revision - the commit hash
 * revisionTime - the time that this commit was made
 * version - the first 7 characters of the commit hash
 * buildTime - the time that this build is taking place

the times are formatted in RFC2822 format

## Example Usage

```yaml
uses: bonfirestudios/actions-build-go@v1
with:
    version-path: 'go.bonfire.io/util/version'
```