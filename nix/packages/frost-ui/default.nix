{ buildNpmPackage
, esbuild
, lib
, frost-base ? "/"
, frost-data ? null
, self
}:

let
  src = lib.snowfall.fs.get-file "";
  version = self.sourceInfo.shortRev or "dirty";

  frost-ui = buildNpmPackage ({
    inherit src version;

    pname = "frost-ui";

    npmFlags = [ "--ignore-scripts" ];
    npmDepsHash = "sha256-HbsCMJV5ws2jh1SOVOmLvoyYA3slXC7PX1pmeI4bzso=";

    FROST_BASE = frost-base;
    ESBUILD_BINARY_PATH = "${esbuild}/bin/esbuild";

    installPhase = ''
      mv dist $out
    '';
  } // lib.optionalAttrs (!builtins.isNull frost-data) {
    preBuild = ''
      rm -rf ./src/content/{apps,lib,meta,options,packages,shells}

      cp -r ${frost-data}/* ./src/content/
    '';
  });
in
(builtins.trace version)
  frost-ui
