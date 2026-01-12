Windows PowerShell
Copyright (C) Microsoft Corporation. Todos los derechos reservados.

Instale la versión más reciente de PowerShell para obtener nuevas características y mejoras. https://aka.ms/PSWindows

PS D:\Escritorio\Proyectos\KittyPaw\kittypau_landingpage_demo_2025\Aws\Ec2> ssh -i "kittypau-key.pem" ubuntu@3.135.201.228
Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.14.0-1018-aws x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Fri Jan  9 22:01:40 UTC 2026

  System load:  0.0               Processes:             109
  Usage of /:   40.6% of 6.71GB   Users logged in:       0
  Memory usage: 30%               IPv4 address for enX0: 172.31.14.153
  Swap usage:   0%

 * Ubuntu Pro delivers the most comprehensive open source security and
   compliance features.

   https://ubuntu.com/aws/pro

Expanded Security Maintenance for Applications is not enabled.

1 update can be applied immediately.
1 of these updates is a standard security update.
To see these additional updates run: apt list --upgradable

3 additional security updates can be applied with ESM Apps.
Learn more about enabling ESM Apps service at https://ubuntu.com/esm


Last login: Thu Jan  8 21:26:11 2026 from 186.189.112.96
ubuntu@ip-172-31-14-153:~$ whoami
uname -a
lsb_release -a
client_loop: send disconnect: Connection reset
PS D:\Escritorio\Proyectos\KittyPaw\kittypau_landingpage_demo_2025\Aws\Ec2> ssh -i "kittypau-key.pem" ubuntu@3.135.201.228
Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.14.0-1018-aws x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Fri Jan  9 22:07:07 UTC 2026

  System load:  0.0               Processes:             112
  Usage of /:   40.6% of 6.71GB   Users logged in:       1
  Memory usage: 31%               IPv4 address for enX0: 172.31.14.153
  Swap usage:   0%

 * Ubuntu Pro delivers the most comprehensive open source security and
   compliance features.

   https://ubuntu.com/aws/pro

Expanded Security Maintenance for Applications is not enabled.

1 update can be applied immediately.
1 of these updates is a standard security update.
To see these additional updates run: apt list --upgradable

3 additional security updates can be applied with ESM Apps.
Learn more about enabling ESM Apps service at https://ubuntu.com/esm


Last login: Fri Jan  9 22:01:41 2026 from 186.189.112.96
ubuntu@ip-172-31-14-153:~$ whoami
uname -a
lsb_release -a
ubuntu
Linux ip-172-31-14-153 6.14.0-1018-aws #18~24.04.1-Ubuntu SMP Mon Nov 24 19:46:27 UTC 2025 x86_64 x86_64 x86_64 GNU/Linux
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 24.04.3 LTS
Release:        24.04
Codename:       noble
ubuntu@ip-172-31-14-153:~$ ^C
ubuntu@ip-172-31-14-153:~$ cd ~
tree -L 4 kittypau
Command 'tree' not found, but can be installed with:
sudo snap install tree  # version 2.1.3+pkg-5852, or
sudo apt  install tree  # version 2.1.1-2ubuntu3.24.04.2
See 'snap info tree' for additional versions.
ubuntu@ip-172-31-14-153:~$ sudo apt update && sudo apt install -y tree
Hit:1 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble InRelease
Get:2 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]
Get:3 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-backports InRelease [126 kB]
Hit:4 https://deb.nodesource.com/node_24.x nodistro InRelease
Get:5 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
Get:6 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 Packages [1690 kB]
Get:7 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 Components [175 kB]
Get:8 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 c-n-f Metadata [15.8 kB]
Get:9 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/universe amd64 Packages [1511 kB]
Get:10 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/universe amd64 Components [378 kB]
Get:11 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/universe amd64 c-n-f Metadata [31.5 kB]
Get:12 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/restricted amd64 Components [212 B]
Get:13 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/multiverse amd64 Components [940 B]
Get:14 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-backports/main amd64 Components [7308 B]
Get:15 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-backports/universe amd64 Components [10.5 kB]
Get:16 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-backports/restricted amd64 Components [216 B]
Get:17 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-backports/multiverse amd64 Components [212 B]
Get:18 http://security.ubuntu.com/ubuntu noble-security/main amd64 Components [21.5 kB]
Get:19 http://security.ubuntu.com/ubuntu noble-security/universe amd64 Components [71.4 kB]
Get:20 http://security.ubuntu.com/ubuntu noble-security/restricted amd64 Components [212 B]
Get:21 http://security.ubuntu.com/ubuntu noble-security/multiverse amd64 Components [212 B]
Fetched 4292 kB in 2s (2703 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
2 packages can be upgraded. Run 'apt list --upgradable' to see them.
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  tree
0 upgraded, 1 newly installed, 0 to remove and 2 not upgraded.
Need to get 47.4 kB of archives.
After this operation, 111 kB of additional disk space will be used.
Get:1 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/universe amd64 tree amd64 2.1.1-2ubuntu3.24.04.2 [47.4 kB]
Fetched 47.4 kB in 0s (1048 kB/s)
Selecting previously unselected package tree.
(Reading database ... 109458 files and directories currently installed.)
Preparing to unpack .../tree_2.1.1-2ubuntu3.24.04.2_amd64.deb ...
Unpacking tree (2.1.1-2ubuntu3.24.04.2) ...
Setting up tree (2.1.1-2ubuntu3.24.04.2) ...
Processing triggers for man-db (2.12.0-4build2) ...
Scanning processes...
Scanning linux images...

Running kernel seems to be up-to-date.

No services need to be restarted.

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
ubuntu@ip-172-31-14-153:~$ tree -L 4 kittypau
kittypau
├── certs
│   ├── AmazonRootCA1.pem
│   ├── device.pem.crt
│   └── private.pem.key
├── db.js
├── index.js
├── index.js.bak
├── node_modules
│   ├── @babel
│   │   └── runtime
│   │       ├── LICENSE
│   │       ├── README.md
│   │       ├── helpers
│   │       ├── package.json
│   │       └── regenerator
│   ├── @types
│   │   ├── node
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── assert
│   │   │   ├── assert.d.ts
│   │   │   ├── async_hooks.d.ts
│   │   │   ├── buffer.buffer.d.ts
│   │   │   ├── buffer.d.ts
│   │   │   ├── child_process.d.ts
│   │   │   ├── cluster.d.ts
│   │   │   ├── compatibility
│   │   │   ├── console.d.ts
│   │   │   ├── constants.d.ts
│   │   │   ├── crypto.d.ts
│   │   │   ├── dgram.d.ts
│   │   │   ├── diagnostics_channel.d.ts
│   │   │   ├── dns
│   │   │   ├── dns.d.ts
│   │   │   ├── domain.d.ts
│   │   │   ├── events.d.ts
│   │   │   ├── fs
│   │   │   ├── fs.d.ts
│   │   │   ├── globals.d.ts
│   │   │   ├── globals.typedarray.d.ts
│   │   │   ├── http.d.ts
│   │   │   ├── http2.d.ts
│   │   │   ├── https.d.ts
│   │   │   ├── index.d.ts
│   │   │   ├── inspector
│   │   │   ├── inspector.d.ts
│   │   │   ├── inspector.generated.d.ts
│   │   │   ├── module.d.ts
│   │   │   ├── net.d.ts
│   │   │   ├── os.d.ts
│   │   │   ├── package.json
│   │   │   ├── path
│   │   │   ├── path.d.ts
│   │   │   ├── perf_hooks.d.ts
│   │   │   ├── process.d.ts
│   │   │   ├── punycode.d.ts
│   │   │   ├── querystring.d.ts
│   │   │   ├── quic.d.ts
│   │   │   ├── readline
│   │   │   ├── readline.d.ts
│   │   │   ├── repl.d.ts
│   │   │   ├── sea.d.ts
│   │   │   ├── sqlite.d.ts
│   │   │   ├── stream
│   │   │   ├── stream.d.ts
│   │   │   ├── string_decoder.d.ts
│   │   │   ├── test
│   │   │   ├── test.d.ts
│   │   │   ├── timers
│   │   │   ├── timers.d.ts
│   │   │   ├── tls.d.ts
│   │   │   ├── trace_events.d.ts
│   │   │   ├── ts5.6
│   │   │   ├── ts5.7
│   │   │   ├── tty.d.ts
│   │   │   ├── url.d.ts
│   │   │   ├── util
│   │   │   ├── util.d.ts
│   │   │   ├── v8.d.ts
│   │   │   ├── vm.d.ts
│   │   │   ├── wasi.d.ts
│   │   │   ├── web-globals
│   │   │   ├── worker_threads.d.ts
│   │   │   └── zlib.d.ts
│   │   ├── readable-stream
│   │   │   ├── LICENSE
│   │   │   ├── README.md
│   │   │   ├── index.d.ts
│   │   │   └── package.json
│   │   └── ws
│   │       ├── LICENSE
│   │       ├── README.md
│   │       ├── index.d.mts
│   │       ├── index.d.ts
│   │       └── package.json
│   ├── abort-controller
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── browser.js
│   │   ├── browser.mjs
│   │   ├── dist
│   │   │   ├── abort-controller.d.ts
│   │   │   ├── abort-controller.js
│   │   │   ├── abort-controller.js.map
│   │   │   ├── abort-controller.mjs
│   │   │   ├── abort-controller.mjs.map
│   │   │   ├── abort-controller.umd.js
│   │   │   └── abort-controller.umd.js.map
│   │   ├── package.json
│   │   ├── polyfill.js
│   │   └── polyfill.mjs
│   ├── base64-js
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── base64js.min.js
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   └── package.json
│   ├── bl
│   │   ├── BufferList.d.ts
│   │   ├── BufferList.js
│   │   ├── CHANGELOG.md
│   │   ├── LICENSE.md
│   │   ├── README.md
│   │   ├── bl.js
│   │   ├── index.d.ts
│   │   ├── package.json
│   │   └── test
│   │       ├── convert.js
│   │       ├── indexOf.js
│   │       ├── isBufferList.js
│   │       └── test.js
│   ├── broker-factory
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── build
│   │   │   ├── es2019
│   │   │   └── es5
│   │   ├── package.json
│   │   └── src
│   │       ├── factories
│   │       ├── guards
│   │       ├── interfaces
│   │       ├── module.ts
│   │       ├── tsconfig.json
│   │       └── types
│   ├── buffer
│   │   ├── AUTHORS.md
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   └── package.json
│   ├── buffer-from
│   │   ├── LICENSE
│   │   ├── index.js
│   │   ├── package.json
│   │   └── readme.md
│   ├── commist
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── example.js
│   │   ├── index.js
│   │   ├── leven.js
│   │   ├── package.json
│   │   └── test.js
│   ├── concat-stream
│   │   ├── LICENSE
│   │   ├── index.js
│   │   ├── node_modules
│   │   │   └── readable-stream
│   │   ├── package.json
│   │   └── readme.md
│   ├── debug
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── package.json
│   │   └── src
│   │       ├── browser.js
│   │       ├── common.js
│   │       ├── index.js
│   │       └── node.js
│   ├── dotenv
│   │   ├── CHANGELOG.md
│   │   ├── LICENSE
│   │   ├── README-es.md
│   │   ├── README.md
│   │   ├── SECURITY.md
│   │   ├── config.d.ts
│   │   ├── config.js
│   │   ├── lib
│   │   │   ├── cli-options.js
│   │   │   ├── env-options.js
│   │   │   ├── main.d.ts
│   │   │   └── main.js
│   │   └── package.json
│   ├── event-target-shim
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── dist
│   │   │   ├── event-target-shim.js
│   │   │   ├── event-target-shim.js.map
│   │   │   ├── event-target-shim.mjs
│   │   │   ├── event-target-shim.mjs.map
│   │   │   ├── event-target-shim.umd.js
│   │   │   └── event-target-shim.umd.js.map
│   │   ├── index.d.ts
│   │   └── package.json
│   ├── events
│   │   ├── History.md
│   │   ├── LICENSE
│   │   ├── Readme.md
│   │   ├── events.js
│   │   ├── package.json
│   │   ├── security.md
│   │   └── tests
│   │       ├── add-listeners.js
│   │       ├── check-listener-leaks.js
│   │       ├── common.js
│   │       ├── errors.js
│   │       ├── events-list.js
│   │       ├── events-once.js
│   │       ├── index.js
│   │       ├── legacy-compat.js
│   │       ├── listener-count.js
│   │       ├── listeners-side-effects.js
│   │       ├── listeners.js
│   │       ├── max-listeners.js
│   │       ├── method-names.js
│   │       ├── modify-in-emit.js
│   │       ├── num-args.js
│   │       ├── once.js
│   │       ├── prepend.js
│   │       ├── remove-all-listeners.js
│   │       ├── remove-listeners.js
│   │       ├── set-max-listeners-side-effects.js
│   │       ├── special-event-names.js
│   │       ├── subclass.js
│   │       └── symbols.js
│   ├── fast-unique-numbers
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── build
│   │   │   ├── es2019
│   │   │   ├── es5
│   │   │   └── node
│   │   ├── package.json
│   │   └── src
│   │       ├── factories
│   │       ├── module.ts
│   │       └── tsconfig.json
│   ├── help-me
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── doc
│   │   │   ├── hello.txt
│   │   │   └── help.txt
│   │   ├── example.js
│   │   ├── fixture
│   │   │   ├── basic
│   │   │   ├── dir
│   │   │   ├── no-ext
│   │   │   ├── sameprefix
│   │   │   └── shortnames
│   │   ├── help-me.js
│   │   ├── package.json
│   │   └── test.js
│   ├── ieee754
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   └── package.json
│   ├── inherits
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── inherits.js
│   │   ├── inherits_browser.js
│   │   └── package.json
│   ├── ip-address
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── dist
│   │   │   ├── address-error.d.ts
│   │   │   ├── address-error.d.ts.map
│   │   │   ├── address-error.js
│   │   │   ├── address-error.js.map
│   │   │   ├── common.d.ts
│   │   │   ├── common.d.ts.map
│   │   │   ├── common.js
│   │   │   ├── common.js.map
│   │   │   ├── ip-address.d.ts
│   │   │   ├── ip-address.d.ts.map
│   │   │   ├── ip-address.js
│   │   │   ├── ip-address.js.map
│   │   │   ├── ipv4.d.ts
│   │   │   ├── ipv4.d.ts.map
│   │   │   ├── ipv4.js
│   │   │   ├── ipv4.js.map
│   │   │   ├── ipv6.d.ts
│   │   │   ├── ipv6.d.ts.map
│   │   │   ├── ipv6.js
│   │   │   ├── ipv6.js.map
│   │   │   ├── v4
│   │   │   └── v6
│   │   ├── package.json
│   │   └── src
│   │       ├── address-error.ts
│   │       ├── common.ts
│   │       ├── ip-address.ts
│   │       ├── ipv4.ts
│   │       ├── ipv6.ts
│   │       ├── v4
│   │       └── v6
│   ├── js-sdsl
│   │   ├── CHANGELOG.md
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── README.zh-CN.md
│   │   ├── dist
│   │   │   ├── cjs
│   │   │   ├── esm
│   │   │   └── umd
│   │   └── package.json
│   ├── lru-cache
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── dist
│   │   │   ├── commonjs
│   │   │   └── esm
│   │   └── package.json
│   ├── minimist
│   │   ├── CHANGELOG.md
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── example
│   │   │   └── parse.js
│   │   ├── index.js
│   │   ├── package.json
│   │   └── test
│   │       ├── all_bool.js
│   │       ├── bool.js
│   │       ├── dash.js
│   │       ├── default_bool.js
│   │       ├── dotted.js
│   │       ├── kv_short.js
│   │       ├── long.js
│   │       ├── num.js
│   │       ├── parse.js
│   │       ├── parse_modified.js
│   │       ├── proto.js
│   │       ├── short.js
│   │       ├── stop_early.js
│   │       ├── unknown.js
│   │       └── whitespace.js
│   ├── mqtt
│   │   ├── CONTRIBUTING.md
│   │   ├── LICENSE.md
│   │   ├── README.md
│   │   ├── build
│   │   │   ├── bin
│   │   │   ├── index.d.ts
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   ├── lib
│   │   │   ├── mqtt.d.ts
│   │   │   ├── mqtt.js
│   │   │   ├── mqtt.js.map
│   │   │   └── tsconfig.build.tsbuildinfo
│   │   ├── dist
│   │   │   ├── mqtt.esm.js
│   │   │   ├── mqtt.js
│   │   │   └── mqtt.min.js
│   │   ├── help
│   │   │   ├── help.txt
│   │   │   ├── publish.txt
│   │   │   └── subscribe.txt
│   │   └── package.json
│   ├── mqtt-packet
│   │   ├── CONTRIBUTING.md
│   │   ├── LICENSE.md
│   │   ├── README.md
│   │   ├── benchmarks
│   │   │   ├── generate.js
│   │   │   ├── generateNet.js
│   │   │   ├── parse.js
│   │   │   └── writeToStream.js
│   │   ├── constants.js
│   │   ├── generate.js
│   │   ├── mqtt.js
│   │   ├── numbers.js
│   │   ├── package.json
│   │   ├── packet.js
│   │   ├── parser.js
│   │   ├── test.js
│   │   ├── testRandom.js
│   │   ├── types
│   │   │   └── index.d.ts
│   │   └── writeToStream.js
│   ├── ms
│   │   ├── index.js
│   │   ├── license.md
│   │   ├── package.json
│   │   └── readme.md
│   ├── number-allocator
│   │   ├── CHANGELOG.md
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── index.js
│   │   ├── karma.conf.js
│   │   ├── lib
│   │   │   └── number-allocator.js
│   │   ├── package.json
│   │   ├── test
│   │   │   ├── test.js
│   │   │   └── typescript
│   │   └── types
│   │       ├── index.d.ts
│   │       └── lib
│   ├── pg
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── esm
│   │   │   └── index.mjs
│   │   ├── lib
│   │   │   ├── client.js
│   │   │   ├── connection-parameters.js
│   │   │   ├── connection.js
│   │   │   ├── crypto
│   │   │   ├── defaults.js
│   │   │   ├── index.js
│   │   │   ├── native
│   │   │   ├── query.js
│   │   │   ├── result.js
│   │   │   ├── stream.js
│   │   │   ├── type-overrides.js
│   │   │   └── utils.js
│   │   └── package.json
│   ├── pg-cloudflare
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── dist
│   │   │   ├── empty.d.ts
│   │   │   ├── empty.js
│   │   │   ├── empty.js.map
│   │   │   ├── index.d.ts
│   │   │   ├── index.js
│   │   │   └── index.js.map
│   │   ├── esm
│   │   │   └── index.mjs
│   │   ├── package.json
│   │   └── src
│   │       ├── empty.ts
│   │       ├── index.ts
│   │       └── types.d.ts
│   ├── pg-connection-string
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── esm
│   │   │   └── index.mjs
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   └── package.json
│   ├── pg-int8
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── index.js
│   │   └── package.json
│   ├── pg-pool
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── esm
│   │   │   └── index.mjs
│   │   ├── index.js
│   │   └── package.json
│   ├── pg-protocol
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── dist
│   │   │   ├── b.d.ts
│   │   │   ├── b.js
│   │   │   ├── b.js.map
│   │   │   ├── buffer-reader.d.ts
│   │   │   ├── buffer-reader.js
│   │   │   ├── buffer-reader.js.map
│   │   │   ├── buffer-writer.d.ts
│   │   │   ├── buffer-writer.js
│   │   │   ├── buffer-writer.js.map
│   │   │   ├── inbound-parser.test.d.ts
│   │   │   ├── inbound-parser.test.js
│   │   │   ├── inbound-parser.test.js.map
│   │   │   ├── index.d.ts
│   │   │   ├── index.js
│   │   │   ├── index.js.map
│   │   │   ├── messages.d.ts
│   │   │   ├── messages.js
│   │   │   ├── messages.js.map
│   │   │   ├── outbound-serializer.test.d.ts
│   │   │   ├── outbound-serializer.test.js
│   │   │   ├── outbound-serializer.test.js.map
│   │   │   ├── parser.d.ts
│   │   │   ├── parser.js
│   │   │   ├── parser.js.map
│   │   │   ├── serializer.d.ts
│   │   │   ├── serializer.js
│   │   │   └── serializer.js.map
│   │   ├── esm
│   │   │   └── index.js
│   │   ├── package.json
│   │   └── src
│   │       ├── b.ts
│   │       ├── buffer-reader.ts
│   │       ├── buffer-writer.ts
│   │       ├── inbound-parser.test.ts
│   │       ├── index.ts
│   │       ├── messages.ts
│   │       ├── outbound-serializer.test.ts
│   │       ├── parser.ts
│   │       ├── serializer.ts
│   │       ├── testing
│   │       └── types
│   ├── pg-types
│   │   ├── Makefile
│   │   ├── README.md
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.test-d.ts
│   │   ├── lib
│   │   │   ├── arrayParser.js
│   │   │   ├── binaryParsers.js
│   │   │   ├── builtins.js
│   │   │   └── textParsers.js
│   │   ├── package.json
│   │   └── test
│   │       ├── index.js
│   │       └── types.js
│   ├── pgpass
│   │   ├── README.md
│   │   ├── lib
│   │   │   ├── helper.js
│   │   │   └── index.js
│   │   └── package.json
│   ├── postgres-array
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── license
│   │   ├── package.json
│   │   └── readme.md
│   ├── postgres-bytea
│   │   ├── index.js
│   │   ├── license
│   │   ├── package.json
│   │   └── readme.md
│   ├── postgres-date
│   │   ├── index.js
│   │   ├── license
│   │   ├── package.json
│   │   └── readme.md
│   ├── postgres-interval
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── license
│   │   ├── package.json
│   │   └── readme.md
│   ├── process
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── browser.js
│   │   ├── index.js
│   │   ├── package.json
│   │   └── test.js
│   ├── process-nextick-args
│   │   ├── index.js
│   │   ├── license.md
│   │   ├── package.json
│   │   └── readme.md
│   ├── readable-stream
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── lib
│   │   │   ├── _stream_duplex.js
│   │   │   ├── _stream_passthrough.js
│   │   │   ├── _stream_readable.js
│   │   │   ├── _stream_transform.js
│   │   │   ├── _stream_writable.js
│   │   │   ├── internal
│   │   │   ├── ours
│   │   │   ├── stream
│   │   │   └── stream.js
│   │   └── package.json
│   ├── rfdc
│   │   ├── LICENSE
│   │   ├── default.js
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.test-d.ts
│   │   ├── package.json
│   │   ├── readme.md
│   │   └── test
│   │       └── index.js
│   ├── safe-buffer
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   └── package.json
│   ├── smart-buffer
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── build
│   │   │   ├── smartbuffer.js
│   │   │   ├── smartbuffer.js.map
│   │   │   ├── utils.js
│   │   │   └── utils.js.map
│   │   ├── docs
│   │   │   ├── CHANGELOG.md
│   │   │   ├── README_v3.md
│   │   │   └── ROADMAP.md
│   │   ├── package.json
│   │   └── typings
│   │       ├── smartbuffer.d.ts
│   │       └── utils.d.ts
│   ├── socks
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── build
│   │   │   ├── client
│   │   │   ├── common
│   │   │   ├── index.js
│   │   │   └── index.js.map
│   │   ├── docs
│   │   │   ├── examples
│   │   │   ├── index.md
│   │   │   └── migratingFromV1.md
│   │   ├── package.json
│   │   └── typings
│   │       ├── client
│   │       ├── common
│   │       └── index.d.ts
│   ├── split2
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── bench.js
│   │   ├── index.js
│   │   ├── package.json
│   │   └── test.js
│   ├── string_decoder
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── lib
│   │   │   └── string_decoder.js
│   │   └── package.json
│   ├── tslib
│   │   ├── CopyrightNotice.txt
│   │   ├── LICENSE.txt
│   │   ├── README.md
│   │   ├── SECURITY.md
│   │   ├── modules
│   │   │   ├── index.d.ts
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   ├── package.json
│   │   ├── tslib.d.ts
│   │   ├── tslib.es6.html
│   │   ├── tslib.es6.js
│   │   ├── tslib.es6.mjs
│   │   ├── tslib.html
│   │   └── tslib.js
│   ├── typedarray
│   │   ├── LICENSE
│   │   ├── example
│   │   │   └── tarray.js
│   │   ├── index.js
│   │   ├── package.json
│   │   ├── readme.markdown
│   │   └── test
│   │       ├── server
│   │       └── tarray.js
│   ├── undici-types
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── agent.d.ts
│   │   ├── api.d.ts
│   │   ├── balanced-pool.d.ts
│   │   ├── cache-interceptor.d.ts
│   │   ├── cache.d.ts
│   │   ├── client-stats.d.ts
│   │   ├── client.d.ts
│   │   ├── connector.d.ts
│   │   ├── content-type.d.ts
│   │   ├── cookies.d.ts
│   │   ├── diagnostics-channel.d.ts
│   │   ├── dispatcher.d.ts
│   │   ├── env-http-proxy-agent.d.ts
│   │   ├── errors.d.ts
│   │   ├── eventsource.d.ts
│   │   ├── fetch.d.ts
│   │   ├── formdata.d.ts
│   │   ├── global-dispatcher.d.ts
│   │   ├── global-origin.d.ts
│   │   ├── h2c-client.d.ts
│   │   ├── handlers.d.ts
│   │   ├── header.d.ts
│   │   ├── index.d.ts
│   │   ├── interceptors.d.ts
│   │   ├── mock-agent.d.ts
│   │   ├── mock-call-history.d.ts
│   │   ├── mock-client.d.ts
│   │   ├── mock-errors.d.ts
│   │   ├── mock-interceptor.d.ts
│   │   ├── mock-pool.d.ts
│   │   ├── package.json
│   │   ├── patch.d.ts
│   │   ├── pool-stats.d.ts
│   │   ├── pool.d.ts
│   │   ├── proxy-agent.d.ts
│   │   ├── readable.d.ts
│   │   ├── retry-agent.d.ts
│   │   ├── retry-handler.d.ts
│   │   ├── snapshot-agent.d.ts
│   │   ├── util.d.ts
│   │   ├── utility.d.ts
│   │   ├── webidl.d.ts
│   │   └── websocket.d.ts
│   ├── util-deprecate
│   │   ├── History.md
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── browser.js
│   │   ├── node.js
│   │   └── package.json
│   ├── worker-factory
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── build
│   │   │   ├── es2019
│   │   │   └── es5
│   │   ├── package.json
│   │   └── src
│   │       ├── helpers
│   │       ├── interfaces
│   │       ├── module.ts
│   │       ├── tsconfig.json
│   │       └── types
│   ├── worker-timers
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── build
│   │   │   ├── es2019
│   │   │   └── es5
│   │   ├── package.json
│   │   └── src
│   │       ├── factories
│   │       ├── module.ts
│   │       ├── tsconfig.json
│   │       └── worker
│   ├── worker-timers-broker
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── build
│   │   │   ├── es2019
│   │   │   └── es5
│   │   ├── package.json
│   │   └── src
│   │       ├── factories
│   │       ├── interfaces
│   │       ├── module.ts
│   │       ├── tsconfig.json
│   │       └── types
│   ├── worker-timers-worker
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── build
│   │   │   ├── es2019
│   │   │   └── es5
│   │   ├── package.json
│   │   └── src
│   │       ├── factories
│   │       ├── interfaces
│   │       ├── module.ts
│   │       ├── tsconfig.json
│   │       └── types
│   ├── ws
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── browser.js
│   │   ├── index.js
│   │   ├── lib
│   │   │   ├── buffer-util.js
│   │   │   ├── constants.js
│   │   │   ├── event-target.js
│   │   │   ├── extension.js
│   │   │   ├── limiter.js
│   │   │   ├── permessage-deflate.js
│   │   │   ├── receiver.js
│   │   │   ├── sender.js
│   │   │   ├── stream.js
│   │   │   ├── subprotocol.js
│   │   │   ├── validation.js
│   │   │   ├── websocket-server.js
│   │   │   └── websocket.js
│   │   ├── package.json
│   │   └── wrapper.mjs
│   ├── xtend
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── immutable.js
│   │   ├── mutable.js
│   │   ├── package.json
│   │   └── test.js
│   └── zod
│       ├── LICENSE
│       ├── README.md
│       ├── index.cjs
│       ├── index.d.cts
│       ├── index.d.ts
│       ├── index.js
│       ├── package.json
│       ├── src
│       │   ├── index.ts
│       │   ├── v3
│       │   ├── v4
│       │   └── v4-mini
│       ├── v3
│       │   ├── ZodError.cjs
│       │   ├── ZodError.d.cts
│       │   ├── ZodError.d.ts
│       │   ├── ZodError.js
│       │   ├── errors.cjs
│       │   ├── errors.d.cts
│       │   ├── errors.d.ts
│       │   ├── errors.js
│       │   ├── external.cjs
│       │   ├── external.d.cts
│       │   ├── external.d.ts
│       │   ├── external.js
│       │   ├── helpers
│       │   ├── index.cjs
│       │   ├── index.d.cts
│       │   ├── index.d.ts
│       │   ├── index.js
│       │   ├── locales
│       │   ├── standard-schema.cjs
│       │   ├── standard-schema.d.cts
│       │   ├── standard-schema.d.ts
│       │   ├── standard-schema.js
│       │   ├── types.cjs
│       │   ├── types.d.cts
│       │   ├── types.d.ts
│       │   └── types.js
│       ├── v4
│       │   ├── classic
│       │   ├── core
│       │   ├── index.cjs
│       │   ├── index.d.cts
│       │   ├── index.d.ts
│       │   ├── index.js
│       │   ├── locales
│       │   └── mini
│       └── v4-mini
│           ├── index.cjs
│           ├── index.d.cts
│           ├── index.d.ts
│           └── index.js
├── package-lock.json
├── package.json
├── schema.js
└── schema.js.bak

216 directories, 653 files
ubuntu@ip-172-31-14-153:~$ cd ~/kittypau
ls -lah
total 72K
drwxrwxr-x  4 ubuntu ubuntu 4.0K Jan  8 21:22 .
drwxr-x---  9 ubuntu ubuntu 4.0K Jan  8 16:11 ..
-rw-rw-r--  1 ubuntu ubuntu  452 Jan  8 20:12 .env
drwxrwxr-x  2 ubuntu ubuntu 4.0K Jan  7 02:36 certs
-rw-rw-r--  1 ubuntu ubuntu  503 Jan  7 16:45 db.js
-rw-rw-r--  1 ubuntu ubuntu 2.9K Jan  8 21:22 index.js
-rw-rw-r--  1 ubuntu ubuntu 1.5K Jan  8 21:20 index.js.bak
drwxrwxr-x 61 ubuntu ubuntu 4.0K Jan  7 16:08 node_modules
-rw-rw-r--  1 ubuntu ubuntu  25K Jan  7 16:08 package-lock.json
-rw-rw-r--  1 ubuntu ubuntu  253 Jan  7 16:44 package.json
-rw-rw-r--  1 ubuntu ubuntu  436 Jan  8 21:21 schema.js
-rw-rw-r--  1 ubuntu ubuntu  151 Jan  8 21:20 schema.js.bak
ubuntu@ip-172-31-14-153:~/kittypau$ cat package.json
{
  "name": "kittypau",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "dotenv": "^17.2.3",
    "mqtt": "^5.0.0",
    "pg": "^8.11.5",
    "zod": "^3.23.8"
  }
}
ubuntu@ip-172-31-14-153:~/kittypau$ cat index.js
require('dotenv').config();

const mqtt = require('mqtt');
const fs = require('fs');
const pool = require('./db');
const {
  sensorPayloadSchema,
  statusPayloadSchema,
} = require('./schema');

// ===============================
// MQTT Client (AWS IoT)
// ===============================
const client = mqtt.connect({
  host: process.env.AWS_IOT_ENDPOINT,
  port: 8883,
  protocol: 'mqtts',
  key: fs.readFileSync(process.env.AWS_KEY),
  cert: fs.readFileSync(process.env.AWS_CERT),
  ca: fs.readFileSync(process.env.AWS_CA),
});

// ===============================
// MQTT Events
// ===============================
client.on('connect', () => {
  console.log('🐾 KITTYPAU conectado a AWS IoT');

  // Escuchar TODOS los dispositivos reales
  client.subscribe('+/sensors');
  client.subscribe('+/status');

  console.log('📡 Suscripto a +/sensors y +/status');
});

client.on('message', async (topic, message) => {
  const parts = topic.split('/');
  const deviceId = parts[0];
  const channel = parts[1];

  try {
    // ===============================
    // SENSORS
    // ===============================
    if (channel === 'sensors') {
      const payload = JSON.parse(message.toString());
      const data = sensorPayloadSchema.parse(payload);

      await pool.query(
        `
        INSERT INTO sensor_readings (
          ts,
          device_id,
          temperature_celsius,
          humidity_percent,
          light_lux,
          weight_grams
        )
        VALUES (NOW(), $1, $2, $3, $4, $5)
        `,
        [
          deviceId,
          data.temp,
          data.hum,
          data.ldr ?? null,
          data.weight ?? null,
        ]
      );

      await pool.query(
        `
        UPDATE devices
        SET last_seen = NOW()
        WHERE device_id = $1
        `,
        [deviceId]
      );

      console.log('💾 Sensor guardado:', deviceId);
    }

    // ===============================
    // STATUS
    // ===============================
    if (channel === 'status') {
      const raw = message.toString();

      const parsed = raw.startsWith('{')
        ? JSON.parse(raw)
        : { status: raw };

      const data = statusPayloadSchema.parse(parsed);
      const status =
        typeof data === 'string' ? data : data.status;

      await pool.query(
        `
        INSERT INTO device_events (device_id, event_type, payload)
        VALUES ($1, $2, $3)
        `,
        [deviceId, status.toLowerCase(), parsed]
      );

      await pool.query(
        `
        UPDATE devices
        SET status = $1, last_seen = NOW()
        WHERE device_id = $2
        `,
        [status.toLowerCase(), deviceId]
      );

      console.log('📟 Status actualizado:', deviceId, status);
    }
  } catch (err) {
    console.error('❌ Error procesando mensaje:', err.message || err);
  }
});

client.on('error', (err) => {
  console.error('❌ Error MQTT:', err);
});
ubuntu@ip-172-31-14-153:~/kittypau$ cat schema.js
const { z } = require('zod');

// Payload REAL del ESP (KPCL0033/sensors)
const sensorPayloadSchema = z.object({
  temp: z.number(),
  hum: z.number(),
  weight: z.number().optional(),
  ldr: z.number().optional(),
});

// Status puede venir como string ("OK") o JSON
const statusPayloadSchema = z.union([
  z.string(),
  z.object({
    status: z.string(),
  }),
]);

module.exports = {
  sensorPayloadSchema,
  statusPayloadSchema,
};
ubuntu@ip-172-31-14-153:~/kittypau$ grep -R "subscribe" -n .
grep -R "KPCL" -n .
grep -R "kittypau" -n .
./index.js.bak:26:  client.subscribe(process.env.AWS_IOT_TOPIC, (err) => {
./index.js:30:  client.subscribe('+/sensors');
./index.js:31:  client.subscribe('+/status');
./node_modules/dotenv/README.md:217:You need to keep `.env` files in sync between machines, environments, or team members? Use [dotenvx](https://github.com/dotenvx/dotenvx) to encrypt your `.env` files and safely include them in source control. This still subscribes to the twelve-factor app rules by generating a decryption key separate from code.
./node_modules/readable-stream/lib/internal/streams/readable.js:592:  //   continuing the flow if the stream consumer has just subscribed to the
./node_modules/mqtt/build/bin/mqtt.js:20:commist.register('subscribe', sub_1.default);
./node_modules/mqtt/build/bin/sub.js:54:        return helpMe.toStdout('subscribe');
./node_modules/mqtt/build/bin/sub.js:59:        return helpMe.toStdout('subscribe');
./node_modules/mqtt/build/bin/sub.js:92:        client.subscribe(parsedArgs.topic, { qos: parsedArgs.qos }, (err, result) => {
./node_modules/mqtt/build/lib/handlers/ack.js:12:    16: 'No matching subscribers',
./node_modules/mqtt/build/lib/handlers/ack.js:106:                            delete client['_resubscribeTopics'][topic];
./node_modules/mqtt/build/lib/client.d.ts:1:import { type IAuthPacket, IConnackPacket, IDisconnectPacket, IPublishPacket, type ISubscribePacket, type IUnsubscribePacket, Packet, type QoS, type ISubackPacket, type IConnectPacket } from 'mqtt-packet';
./node_modules/mqtt/build/lib/client.d.ts:63:    resubscribe?: boolean;
./node_modules/mqtt/build/lib/client.d.ts:64:    subscribeBatchSize?: number;
./node_modules/mqtt/build/lib/client.d.ts:111:    resubscribe?: boolean;
./node_modules/mqtt/build/lib/client.d.ts:113:export interface IClientUnsubscribeProperties {
./node_modules/mqtt/build/lib/client.d.ts:114:    properties?: IUnsubscribePacket['properties'];
./node_modules/mqtt/build/lib/client.d.ts:165:    private _resubscribeTopics;
./node_modules/mqtt/build/lib/client.d.ts:188:    subscribe(topicObject: string | string[] | ISubscriptionMap): MqttClient;
./node_modules/mqtt/build/lib/client.d.ts:189:    subscribe(topicObject: string | string[] | ISubscriptionMap, callback?: ClientSubscribeCallback): MqttClient;
./node_modules/mqtt/build/lib/client.d.ts:190:    subscribe(topicObject: string | string[] | ISubscriptionMap, opts?: IClientSubscribeOptions | IClientSubscribeProperties): MqttClient;
./node_modules/mqtt/build/lib/client.d.ts:191:    subscribe(topicObject: string | string[] | ISubscriptionMap, opts?: IClientSubscribeOptions | IClientSubscribeProperties, callback?: ClientSubscribeCallback): MqttClient;
./node_modules/mqtt/build/lib/client.d.ts:192:    subscribeAsync(topicObject: string | string[] | ISubscriptionMap): Promise<ISubscriptionGrant[]>;
./node_modules/mqtt/build/lib/client.d.ts:193:    subscribeAsync(topicObject: string | string[] | ISubscriptionMap, opts?: IClientSubscribeOptions | IClientSubscribeProperties): Promise<ISubscriptionGrant[]>;
./node_modules/mqtt/build/lib/client.d.ts:194:    unsubscribe(topic: string | string[]): MqttClient;
./node_modules/mqtt/build/lib/client.d.ts:195:    unsubscribe(topic: string | string[], opts?: IClientUnsubscribeProperties): MqttClient;
./node_modules/mqtt/build/lib/client.d.ts:196:    unsubscribe(topic: string | string[], callback?: PacketCallback): MqttClient;
./node_modules/mqtt/build/lib/client.d.ts:197:    unsubscribe(topic: string | string[], opts?: IClientUnsubscribeProperties, callback?: PacketCallback): MqttClient;
./node_modules/mqtt/build/lib/client.d.ts:198:    unsubscribeAsync(topic: string | string[]): Promise<Packet | undefined>;
./node_modules/mqtt/build/lib/client.d.ts:199:    unsubscribeAsync(topic: string | string[], opts?: IClientUnsubscribeProperties): Promise<Packet | undefined>;
./node_modules/mqtt/build/lib/client.d.ts:231:    private _resubscribe;
./node_modules/mqtt/build/lib/client.js:67:    resubscribe: true,
./node_modules/mqtt/build/lib/client.js:68:    subscribeBatchSize: null,
./node_modules/mqtt/build/lib/client.js:92:    _resubscribeTopics;
./node_modules/mqtt/build/lib/client.js:158:        this._resubscribeTopics = {};
./node_modules/mqtt/build/lib/client.js:187:                    this._resubscribe();
./node_modules/mqtt/build/lib/client.js:448:    subscribe(topicObject, opts, callback) {
./node_modules/mqtt/build/lib/client.js:454:        let resubscribe = false;
./node_modules/mqtt/build/lib/client.js:464:            resubscribe = topicObject.resubscribe;
./node_modules/mqtt/build/lib/client.js:465:            delete topicObject.resubscribe;
./node_modules/mqtt/build/lib/client.js:474:            this.log('subscribe: discconecting true');
./node_modules/mqtt/build/lib/client.js:490:            if (!Object.prototype.hasOwnProperty.call(this._resubscribeTopics, topic) ||
./node_modules/mqtt/build/lib/client.js:491:                this._resubscribeTopics[topic].qos < subOptions.qos ||
./node_modules/mqtt/build/lib/client.js:492:                resubscribe) {
./node_modules/mqtt/build/lib/client.js:503:                this.log('subscribe: pushing topic `%s` and qos `%s` to subs list', currentOpts.topic, currentOpts.qos);
./node_modules/mqtt/build/lib/client.js:509:                this.log('subscribe: array topic %s', topic);
./node_modules/mqtt/build/lib/client.js:515:                this.log('subscribe: object topic %s, %o', topic, topicObject[topic]);
./node_modules/mqtt/build/lib/client.js:523:        const subscribeChunkedSubs = (chunkedSubs, messageId) => {
./node_modules/mqtt/build/lib/client.js:525:                cmd: 'subscribe',
./node_modules/mqtt/build/lib/client.js:532:            if (this.options.resubscribe) {
./node_modules/mqtt/build/lib/client.js:533:                this.log('subscribe :: resubscribe true');
./node_modules/mqtt/build/lib/client.js:544:                        this._resubscribeTopics[sub.topic] = topic;
./node_modules/mqtt/build/lib/client.js:569:            this.log('subscribe :: call _sendPacket');
./node_modules/mqtt/build/lib/client.js:573:        const subscribeProc = () => {
./node_modules/mqtt/build/lib/client.js:574:            const batchSize = this.options.subscribeBatchSize ?? subs.length;
./node_modules/mqtt/build/lib/client.js:575:            const subscribePromises = [];
./node_modules/mqtt/build/lib/client.js:583:                subscribePromises.push(subscribeChunkedSubs(chunkedSubs, messageId));
./node_modules/mqtt/build/lib/client.js:585:            Promise.all(subscribePromises)
./node_modules/mqtt/build/lib/client.js:596:            !subscribeProc()) {
./node_modules/mqtt/build/lib/client.js:598:                invoke: subscribeProc,
./node_modules/mqtt/build/lib/client.js:604:    subscribeAsync(topicObject, opts) {
./node_modules/mqtt/build/lib/client.js:606:            this.subscribe(topicObject, opts, (err, granted) => {
./node_modules/mqtt/build/lib/client.js:616:    unsubscribe(topic, opts, callback) {
./node_modules/mqtt/build/lib/client.js:632:        const unsubscribeProc = () => {
./node_modules/mqtt/build/lib/client.js:639:                cmd: 'unsubscribe',
./node_modules/mqtt/build/lib/client.js:649:            if (this.options.resubscribe) {
./node_modules/mqtt/build/lib/client.js:651:                    delete this._resubscribeTopics[topic2];
./node_modules/mqtt/build/lib/client.js:661:            this.log('unsubscribe: call _sendPacket');
./node_modules/mqtt/build/lib/client.js:667:            !unsubscribeProc()) {
./node_modules/mqtt/build/lib/client.js:669:                invoke: unsubscribeProc,
./node_modules/mqtt/build/lib/client.js:675:    unsubscribeAsync(topic, opts) {
./node_modules/mqtt/build/lib/client.js:677:            this.unsubscribe(topic, opts, (err, packet) => {
./node_modules/mqtt/build/lib/client.js:1132:    _resubscribe() {
./node_modules/mqtt/build/lib/client.js:1133:        this.log('_resubscribe');
./node_modules/mqtt/build/lib/client.js:1134:        const _resubscribeTopicsKeys = Object.keys(this._resubscribeTopics);
./node_modules/mqtt/build/lib/client.js:1139:            _resubscribeTopicsKeys.length > 0) {
./node_modules/mqtt/build/lib/client.js:1140:            if (this.options.resubscribe) {
./node_modules/mqtt/build/lib/client.js:1142:                    this.log('_resubscribe: protocolVersion 5');
./node_modules/mqtt/build/lib/client.js:1143:                    for (let topicI = 0; topicI < _resubscribeTopicsKeys.length; topicI++) {
./node_modules/mqtt/build/lib/client.js:1144:                        const resubscribeTopic = {};
./node_modules/mqtt/build/lib/client.js:1145:                        resubscribeTopic[_resubscribeTopicsKeys[topicI]] =
./node_modules/mqtt/build/lib/client.js:1146:                            this._resubscribeTopics[_resubscribeTopicsKeys[topicI]];
./node_modules/mqtt/build/lib/client.js:1147:                        resubscribeTopic.resubscribe = true;
./node_modules/mqtt/build/lib/client.js:1148:                        this.subscribe(resubscribeTopic, {
./node_modules/mqtt/build/lib/client.js:1149:                            properties: resubscribeTopic[_resubscribeTopicsKeys[topicI]]
./node_modules/mqtt/build/lib/client.js:1155:                    this._resubscribeTopics.resubscribe = true;
./node_modules/mqtt/build/lib/client.js:1156:                    this.subscribe(this._resubscribeTopics);
./node_modules/mqtt/build/lib/client.js:1160:                this._resubscribeTopics = {};
./node_modules/mqtt/dist/mqtt.esm.js:2:`;super(r),this.name="AggregateError",this.errors=e}};Tf.exports={AggregateError:fs,ArrayIsArray(t){return Array.isArray(t)},ArrayPrototypeIncludes(t,e)
on u(k){return k+" { ? }"}function l(k,B,re,ie){var oe=ie?N(re,ie):q.call(re,", ");return k+" ("+B+") {"+oe+"}"}function S(k){for(var B=0;B<k.length;B++)if(Bt(k[B],`
./node_modules/mqtt/README.md:95:For the sake of simplicity, let's put the subscriber and the publisher in the same file:
./node_modules/mqtt/README.md:102:  client.subscribe("presence", (err) => {
./node_modules/mqtt/README.md:336:- [`mqtt.Client#subscribe()`](#subscribe)
./node_modules/mqtt/README.md:337:- [`mqtt.Client#subscribeAsync()`](#subscribe-async)
./node_modules/mqtt/README.md:338:- [`mqtt.Client#unsubscribe()`](#unsubscribe)
./node_modules/mqtt/README.md:339:- [`mqtt.Client#unsubscribeAsync()`](#unsubscribe-async)
./node_modules/mqtt/README.md:476:  - `resubscribe` : if connection is broken and reconnects,
./node_modules/mqtt/README.md:477:    subscribed topics are automatically subscribed again (default `true`)
./node_modules/mqtt/README.md:478:  - `subscribeBatchSize` : optional `number`
./node_modules/mqtt/README.md:479:    Maximum number of topics per SUBSCRIBE packet. When the number of topics to subscribe exceeds this value, the client will automatically split them into multiple SUBSCRIBE packets of this size.
./node_modules/mqtt/README.md:522:  you may rely on stored session and prefer not to send subscribe commands for the client.
./node_modules/mqtt/README.md:596:subscribed topics as well as packets used by MQTT for managing subscriptions
./node_modules/mqtt/README.md:644:<a name="subscribe"></a>
./node_modules/mqtt/README.md:646:### mqtt.Client#subscribe(topic/topic array/topic object, [options], [callback])
./node_modules/mqtt/README.md:650:- `topic` is a `String` topic to subscribe to or an `Array` of
./node_modules/mqtt/README.md:651:  topics to subscribe to. It can also be an object, it has as object
./node_modules/mqtt/README.md:654:- `options` is the options to subscribe with, including:
./node_modules/mqtt/README.md:666:    - `topic` is a subscribed to topic
./node_modules/mqtt/README.md:669:<a name="subscribe-async"></a>
./node_modules/mqtt/README.md:671:### mqtt.Client#subscribeAsync(topic/topic array/topic object, [options])
./node_modules/mqtt/README.md:673:Async [`subscribe`](#subscribe). Returns a `Promise<ISubscriptionGrant[]>`.
./node_modules/mqtt/README.md:677:<a name="unsubscribe"></a>
./node_modules/mqtt/README.md:679:### mqtt.Client#unsubscribe(topic/topic array, [options], [callback])
./node_modules/mqtt/README.md:681:Unsubscribe from a topic or topics
./node_modules/mqtt/README.md:683:- `topic` is a `String` topic or an array of topics to unsubscribe from
./node_modules/mqtt/README.md:684:- `options`: options of unsubscribe.
./node_modules/mqtt/README.md:689:<a name="unsubscribe-async"></a>
./node_modules/mqtt/README.md:691:### mqtt.Client#unsubscribeAsync(topic/topic array, [options])
./node_modules/mqtt/README.md:693:Async [`unsubscribe`](#unsubscribe). Returns a `Promise<void>`.
./node_modules/mqtt/package.json:14:    "publish/subscribe",
./node_modules/mqtt/package.json:16:    "subscribe"
./node_modules/mqtt/help/subscribe.txt:1:Usage: mqtt subscribe [opts] [topic]
./node_modules/mqtt/help/help.txt:4:  * subscribe   subscribe for updates from the broker
./node_modules/mqtt-packet/parser.js:115:        case 'subscribe':
./node_modules/mqtt-packet/parser.js:121:        case 'unsubscribe':
./node_modules/mqtt-packet/parser.js:122:          this._parseUnsubscribe()
./node_modules/mqtt-packet/parser.js:350:    if (packet.length <= 0) { return this._emitError(new Error('Malformed subscribe, no payload specified')) }
./node_modules/mqtt-packet/parser.js:362:          return this._emitError(new Error('Invalid subscribe topic flag bits, bits 7-6 must be 0'))
./node_modules/mqtt-packet/parser.js:366:          return this._emitError(new Error('Invalid subscribe topic flag bits, bits 7-2 must be 0'))
./node_modules/mqtt-packet/parser.js:372:        return this._emitError(new Error('Invalid subscribe QoS, must be <= 2'))
./node_modules/mqtt-packet/parser.js:434:  _parseUnsubscribe () {
./node_modules/mqtt-packet/parser.js:435:    debug('_parseUnsubscribe')
./node_modules/mqtt-packet/parser.js:451:    if (packet.length <= 0) { return this._emitError(new Error('Malformed unsubscribe, no payload specified')) }
./node_modules/mqtt-packet/parser.js:459:      debug('_parseUnsubscribe: push topic `%s` to unsubscriptions', topic)
./node_modules/mqtt-packet/writeToStream.js:41:    case 'subscribe':
./node_modules/mqtt-packet/writeToStream.js:42:      return subscribe(packet, stream, opts)
./node_modules/mqtt-packet/writeToStream.js:45:    case 'unsubscribe':
./node_modules/mqtt-packet/writeToStream.js:46:      return unsubscribe(packet, stream, opts)
./node_modules/mqtt-packet/writeToStream.js:436:function subscribe (packet, stream, opts) {
./node_modules/mqtt-packet/writeToStream.js:437:  debug('subscribe: packet: ')
./node_modules/mqtt-packet/writeToStream.js:502:  debug('subscribe: writing to stream: %o', protocol.SUBSCRIBE_HEADER)
./node_modules/mqtt-packet/writeToStream.js:597:function unsubscribe (packet, stream, opts) {
./node_modules/mqtt-packet/README.md:234:  cmd: 'subscribe',
./node_modules/mqtt-packet/README.md:273:### Unsubscribe
./node_modules/mqtt-packet/README.md:277:  cmd: 'unsubscribe',
./node_modules/mqtt-packet/constants.js:15:  8: 'subscribe',
./node_modules/mqtt-packet/constants.js:17:  10: 'unsubscribe',
./node_modules/mqtt-packet/constants.js:32:  8: 2, // 'subscribe'
./node_modules/mqtt-packet/constants.js:34:  10: 2, // 'unsubscribe'
./node_modules/mqtt-packet/constants.js:167:protocol.SUBSCRIBE_HEADER = genHeader('subscribe')
./node_modules/mqtt-packet/constants.js:180:/* Unsubscribe */
./node_modules/mqtt-packet/constants.js:181:protocol.UNSUBSCRIBE_HEADER = genHeader('unsubscribe')
./node_modules/mqtt-packet/constants.js:215:  0x10: 'No matching subscribers',
./node_modules/mqtt-packet/package.json:28:    "subscribe",
./node_modules/mqtt-packet/types/index.d.ts:18:  'subscribe' |
./node_modules/mqtt-packet/types/index.d.ts:20:  'unsubscribe'
./node_modules/mqtt-packet/types/index.d.ts:132:  cmd: 'subscribe'
./node_modules/mqtt-packet/types/index.d.ts:151:export interface IUnsubscribePacket extends IPacket {
./node_modules/mqtt-packet/types/index.d.ts:152:  cmd: 'unsubscribe',
./node_modules/mqtt-packet/types/index.d.ts:230:  IUnsubscribePacket |
./node_modules/mqtt-packet/test.js:1307:testParseError('Malformed subscribe, no payload specified', Buffer.from([
./node_modules/mqtt-packet/test.js:1317:testParseError('Malformed unsubscribe, no payload specified', Buffer.from([
./node_modules/mqtt-packet/test.js:2089:testParseError('Invalid header flag bits, must be 0x2 for subscribe packet', Buffer.from([
./node_modules/mqtt-packet/test.js:2090:  128, 9, // Header (subscribeqos=0length=9)
./node_modules/mqtt-packet/test.js:2097:testParseGenerate('subscribe to one topic', {
./node_modules/mqtt-packet/test.js:2098:  cmd: 'subscribe',
./node_modules/mqtt-packet/test.js:2111:  130, 9, // Header (subscribeqos=1length=9)
./node_modules/mqtt-packet/test.js:2118:testParseError('Invalid subscribe QoS, must be <= 2', Buffer.from([
./node_modules/mqtt-packet/test.js:2119:  130, 9, // Header (subscribeqos=0length=9)
./node_modules/mqtt-packet/test.js:2126:testParseError('Invalid subscribe topic flag bits, bits 7-6 must be 0', Buffer.from([
./node_modules/mqtt-packet/test.js:2127:  130, 10, // Header (subscribeqos=0length=9)
./node_modules/mqtt-packet/test.js:2136:  130, 10, // Header (subscribeqos=0length=9)
./node_modules/mqtt-packet/test.js:2144:testParseError('Invalid subscribe topic flag bits, bits 7-2 must be 0', Buffer.from([
./node_modules/mqtt-packet/test.js:2145:  130, 9, // Header (subscribeqos=0length=9)
./node_modules/mqtt-packet/test.js:2152:testParseGenerate('subscribe to one topic by MQTT 5', {
./node_modules/mqtt-packet/test.js:2153:  cmd: 'subscribe',
./node_modules/mqtt-packet/test.js:2175:  130, 26, // Header (subscribeqos=1length=9)
./node_modules/mqtt-packet/test.js:2185:testParseGenerate('subscribe to three topics', {
./node_modules/mqtt-packet/test.js:2186:  cmd: 'subscribe',
./node_modules/mqtt-packet/test.js:2218:testParseGenerate('subscribe to 3 topics by MQTT 5', {
./node_modules/mqtt-packet/test.js:2219:  cmd: 'subscribe',
./node_modules/mqtt-packet/test.js:2254:  130, 40, // Header (subscribeqos=1length=9)
./node_modules/mqtt-packet/test.js:2334:testParseGenerate('unsubscribe', {
./node_modules/mqtt-packet/test.js:2335:  cmd: 'unsubscribe',
./node_modules/mqtt-packet/test.js:2355:testParseError('Invalid header flag bits, must be 0x2 for unsubscribe packet', Buffer.from([
./node_modules/mqtt-packet/test.js:2365:  cmd: 'unsubscribe',
./node_modules/mqtt-packet/test.js:2372:}, {}, 'unsubscribe with unsubscriptions not an array')
./node_modules/mqtt-packet/test.js:2375:  cmd: 'unsubscribe',
./node_modules/mqtt-packet/test.js:2382:}, {}, 'unsubscribe with unsubscriptions as an object')
./node_modules/mqtt-packet/test.js:2384:testParseGenerate('unsubscribe MQTT 5', {
./node_modules/mqtt-packet/test.js:2385:  cmd: 'unsubscribe',
./node_modules/mqtt-packet/test.js:2997:  130, 14, // subscribe header and remaining length
./node_modules/mqtt-packet/test.js:3120:    // Then an invalid subscribe packet:
./node_modules/mqtt-packet/test.js:3122:    128, 9, // Header (subscribeqos=0length=9)
./node_modules/mqtt-packet/test.js:3128:    // And another invalid subscribe packet:
./node_modules/mqtt-packet/test.js:3130:    128, 9, // Header (subscribeqos=0length=9)
./node_modules/mqtt-packet/test.js:3226:  'subscribe',
./node_modules/mqtt-packet/test.js:3228:  'unsubscribe',
./node_modules/@types/node/events.d.ts:561:         * Returns a disposable so that it may be unsubscribed from more easily.
./node_modules/@types/node/diagnostics_channel.d.ts:28:     * Check if there are active subscribers to the named channel. This is helpful if
./node_modules/@types/node/diagnostics_channel.d.ts:38:     *   // There are subscribers, prepare and publish message
./node_modules/@types/node/diagnostics_channel.d.ts:43:     * @return If there are active subscribers
./node_modules/@types/node/diagnostics_channel.d.ts:63:     * Register a message handler to subscribe to this channel. This message handler
./node_modules/@types/node/diagnostics_channel.d.ts:70:     * diagnostics_channel.subscribe('my-channel', (message, name) => {
./node_modules/@types/node/diagnostics_channel.d.ts:78:    function subscribe(name: string | symbol, onMessage: ChannelListener): void;
./node_modules/@types/node/diagnostics_channel.d.ts:80:     * Remove a message handler previously registered to this channel with {@link subscribe}.
./node_modules/@types/node/diagnostics_channel.d.ts:89:     * diagnostics_channel.subscribe('my-channel', onMessage);
./node_modules/@types/node/diagnostics_channel.d.ts:91:     * diagnostics_channel.unsubscribe('my-channel', onMessage);
./node_modules/@types/node/diagnostics_channel.d.ts:95:     * @param onMessage The previous subscribed handler to remove
./node_modules/@types/node/diagnostics_channel.d.ts:98:    function unsubscribe(name: string | symbol, onMessage: ChannelListener): boolean;
./node_modules/@types/node/diagnostics_channel.d.ts:131:     * pipeline. It is used to track subscribers and to publish messages when there
./node_modules/@types/node/diagnostics_channel.d.ts:132:     * are subscribers present. It exists as a separate object to avoid channel
./node_modules/@types/node/diagnostics_channel.d.ts:141:         * Check if there are active subscribers to this channel. This is helpful if
./node_modules/@types/node/diagnostics_channel.d.ts:153:         *   // There are subscribers, prepare and publish message
./node_modules/@types/node/diagnostics_channel.d.ts:161:         * Publish a message to any subscribers to the channel. This will trigger
./node_modules/@types/node/diagnostics_channel.d.ts:174:         * @param message The message to send to the channel subscribers
./node_modules/@types/node/diagnostics_channel.d.ts:178:         * Register a message handler to subscribe to this channel. This message handler
./node_modules/@types/node/diagnostics_channel.d.ts:187:         * channel.subscribe((message, name) => {
./node_modules/@types/node/diagnostics_channel.d.ts:194:        subscribe(onMessage: ChannelListener): void;
./node_modules/@types/node/diagnostics_channel.d.ts:196:         * Remove a message handler previously registered to this channel with `channel.subscribe(onMessage)`.
./node_modules/@types/node/diagnostics_channel.d.ts:207:         * channel.subscribe(onMessage);
./node_modules/@types/node/diagnostics_channel.d.ts:209:         * channel.unsubscribe(onMessage);
./node_modules/@types/node/diagnostics_channel.d.ts:212:         * @param onMessage The previous subscribed handler to remove
./node_modules/@types/node/diagnostics_channel.d.ts:215:        unsubscribe(onMessage: ChannelListener): void;
./node_modules/@types/node/diagnostics_channel.d.ts:293:         * @param context Message to send to subscribers and bind to stores
./node_modules/@types/node/diagnostics_channel.d.ts:354:         * Helper to subscribe a collection of functions to the corresponding channels.
./node_modules/@types/node/diagnostics_channel.d.ts:355:         * This is the same as calling `channel.subscribe(onMessage)` on each channel
./node_modules/@types/node/diagnostics_channel.d.ts:363:         * channels.subscribe({
./node_modules/@types/node/diagnostics_channel.d.ts:383:         * @param subscribers Set of `TracingChannel Channels` subscribers
./node_modules/@types/node/diagnostics_channel.d.ts:385:        subscribe(subscribers: TracingChannelSubscribers<ContextType>): void;
./node_modules/@types/node/diagnostics_channel.d.ts:387:         * Helper to unsubscribe a collection of functions from the corresponding channels.
./node_modules/@types/node/diagnostics_channel.d.ts:388:         * This is the same as calling `channel.unsubscribe(onMessage)` on each channel
./node_modules/@types/node/diagnostics_channel.d.ts:396:         * channels.unsubscribe({
./node_modules/@types/node/diagnostics_channel.d.ts:416:         * @param subscribers Set of `TracingChannel Channels` subscribers
./node_modules/@types/node/diagnostics_channel.d.ts:417:         * @return `true` if all handlers were successfully unsubscribed, and `false` otherwise.
./node_modules/@types/node/diagnostics_channel.d.ts:419:        unsubscribe(subscribers: TracingChannelSubscribers<ContextType>): void;
./node_modules/@types/node/diagnostics_channel.d.ts:425:         * To ensure only correct trace graphs are formed, events will only be published if subscribers are present prior to starting the trace. Subscriptions
./node_modules/@types/node/diagnostics_channel.d.ts:460:         * To ensure only correct trace graphs are formed, events will only be published if subscribers are present prior to starting the trace. Subscriptions
./node_modules/@types/node/diagnostics_channel.d.ts:514:         * To ensure only correct trace graphs are formed, events will only be published if subscribers are present prior to starting the trace. Subscriptions
./node_modules/@types/node/diagnostics_channel.d.ts:554:         * `true` if any of the individual channels has a subscriber, `false` if not.
./node_modules/@types/node/diagnostics_channel.d.ts:557:         * if any of the [TracingChannel Channels](https://nodejs.org/api/diagnostics_channel.html#tracingchannel-channels) have subscribers.
./node_modules/@types/node/diagnostics_channel.d.ts:558:         * A `true` is returned if any of them have at least one subscriber, a `false` is returned otherwise.
./node_modules/@types/node/perf_hooks.d.ts:198:         * wrapped function. A `PerformanceObserver` must be subscribed to the `'function'`
./node_modules/.bin/mqtt:20:commist.register('subscribe', sub_1.default);
./node_modules/.bin/mqtt_sub:54:        return helpMe.toStdout('subscribe');
./node_modules/.bin/mqtt_sub:59:        return helpMe.toStdout('subscribe');
./node_modules/.bin/mqtt_sub:92:        client.subscribe(parsedArgs.topic, { qos: parsedArgs.qos }, (err, result) => {
./node_modules/concat-stream/node_modules/readable-stream/lib/_stream_readable.js:535:  //   continuing the flow if the stream consumer has just subscribed to the
./schema.js:3:// Payload REAL del ESP (KPCL0033/sensors)
./.env:3:AWS_IOT_TOPIC=kittypau/#
./.env:6:AWS_CERT=/home/ubuntu/kittypau/certs/device.pem.crt
./.env:7:AWS_KEY=/home/ubuntu/kittypau/certs/private.pem.key
./.env:8:AWS_CA=/home/ubuntu/kittypau/certs/AmazonRootCA1.pem
./package-lock.json:2:  "name": "kittypau-iot",
./package-lock.json:8:      "name": "kittypau-iot",
./package.json:2:  "name": "kittypau",
./node_modules/.package-lock.json:2:  "name": "kittypau-iot",
ubuntu@ip-172-31-14-153:~/kittypau$ grep -R "INSERT INTO" -n .
grep -R "sensor" -n .
grep -R "telemetry" -n .
grep -R "device" -n .
./index.js.bak:43:      `INSERT INTO telemetry (device_id, temp, hum)
./index.js:51:        INSERT INTO sensor_readings (
./index.js:98:        INSERT INTO device_events (device_id, event_type, payload)
./node_modules/@types/node/sqlite.d.ts:31: * const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
./node_modules/@types/node/sqlite.d.ts:255:         *   INSERT INTO t3 VALUES ('a', 4),
./node_modules/@types/node/sqlite.d.ts:436:         * sql.run`INSERT INTO users VALUES (1, 'Alice')`;
./node_modules/@types/node/sqlite.d.ts:437:         * sql.run`INSERT INTO users VALUES (2, 'Bob')`;
./node_modules/@types/node/sqlite.d.ts:479:         * const insert = sourceDb.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
./index.js:7:  sensorPayloadSchema,
./index.js:30:  client.subscribe('+/sensors');
./index.js:33:  console.log('📡 Suscripto a +/sensors y +/status');
./index.js:45:    if (channel === 'sensors') {
./index.js:47:      const data = sensorPayloadSchema.parse(payload);
./index.js:51:        INSERT INTO sensor_readings (
./schema.js:3:// Payload REAL del ESP (KPCL0033/sensors)
./schema.js:4:const sensorPayloadSchema = z.object({
./schema.js:20:  sensorPayloadSchema,
./schema.js.bak:3:const telemetrySchema = z.object({
./schema.js.bak:9:  telemetrySchema,
./index.js.bak:6:const { telemetrySchema } = require('./schema');
./index.js.bak:38:    const data = telemetrySchema.parse(payload);
./index.js.bak:43:      `INSERT INTO telemetry (device_id, temp, hum)
./.env:6:AWS_CERT=/home/ubuntu/kittypau/certs/device.pem.crt
./index.js.bak:40:    const deviceId = topic.split('/')[2];
./index.js.bak:43:      `INSERT INTO telemetry (device_id, temp, hum)
./index.js.bak:45:      [deviceId, data.temp, data.hum]
./index.js.bak:48:    console.log('💾 Guardado en Neon:', deviceId);
./index.js:38:  const deviceId = parts[0];
./index.js:53:          device_id,
./index.js:62:          deviceId,
./index.js:72:        UPDATE devices
./index.js:74:        WHERE device_id = $1
./index.js:76:        [deviceId]
./index.js:79:      console.log('💾 Sensor guardado:', deviceId);
./index.js:98:        INSERT INTO device_events (device_id, event_type, payload)
./index.js:101:        [deviceId, status.toLowerCase(), parsed]
./index.js:106:        UPDATE devices
./index.js:108:        WHERE device_id = $2
./index.js:110:        [status.toLowerCase(), deviceId]
./index.js:113:      console.log('📟 Status actualizado:', deviceId, status);
./node_modules/ms/readme.md:55:1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
./node_modules/mqtt-packet/README.md:154:  clientId: 'my-device',
./node_modules/mqtt-packet/README.md:159:    topic: 'mydevice/status',
./node_modules/@types/node/tty.d.ts:45:         * raw device.
./node_modules/@types/node/tty.d.ts:53:         * Allows configuration of `tty.ReadStream` so that it operates as a rawdevice.
./node_modules/@types/node/tty.d.ts:61:         * @param mode If `true`, configures the `tty.ReadStream` to operate as a raw device. If `false`, configures the `tty.ReadStream` to operate in its default mode. The `readStream.isRaw`
./node_modules/@types/node/os.d.ts:454:     * operating system. [Android support is experimental](https://github.com/nodejs/node/blob/HEAD/BUILDING.md#androidandroid-based-devices-eg-firefox-os).
./node_modules/@types/node/fs.d.ts:214:         * Returns `true` if the `fs.Dirent` object describes a block device.
./node_modules/@types/node/fs.d.ts:219:         * Returns `true` if the `fs.Dirent` object describes a character device.
./node_modules/@types/node/fs.d.ts:2567:     * device. The specific implementation is operating system and device specific.
./node_modules/@types/node/fs.d.ts:2575:         * Asynchronous fsync(2) - synchronize a file's in-core state with the underlying storage device.
./node_modules/@types/node/fs.d.ts:2582:     * device. The specific implementation is operating system and device specific.
./node_modules/@types/node/fs.d.ts:3798:         * Constant for fs.open(). Flag indicating that if path identifies a terminal device,
./node_modules/@types/node/fs.d.ts:3835:        /** Constant for fs.Stats mode property for determining a file's type. File type constant for a character-oriented device file. */
./node_modules/@types/node/fs.d.ts:3837:        /** Constant for fs.Stats mode property for determining a file's type. File type constant for a block-oriented device file. */
./node_modules/@types/node/fs.d.ts:4117:     * If `fd` points to a character device that only supports blocking reads
./node_modules/@types/node/fs.d.ts:4132:     * // Create a stream from some character device.
./node_modules/@types/node/fs.d.ts:4205:         * Asynchronous fdatasync(2) - synchronize a file's in-core state with storage device.
./node_modules/@types/node/fs/promises.d.ts:147:         * If the `FileHandle` points to a character device that only supports blocking
./node_modules/@types/node/fs/promises.d.ts:159:         * // Create a stream from some character device.
./node_modules/@types/node/fs/promises.d.ts:218:         * device. The specific implementation is operating system and device specific.
./node_modules/@types/node/process.d.ts:161:                 * Resident Set Size, is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the
./node_modules/@types/node/process.d.ts:1680:                 * Android operating system. However, Android support in Node.js [is experimental](https://github.com/nodejs/node/blob/HEAD/BUILDING.md#androidandroid-based-devices-eg-firefox-os).
ubuntu@ip-172-31-14-153:~/kittypau$ pm2 list
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ kittypau-iot       │ fork     │ 1    │ online    │ 0%       │ 91.6mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
ubuntu@ip-172-31-14-153:~/kittypau$ pm2 describe kittypau-iot
 Describing process with id 0 - name kittypau-iot
┌───────────────────┬───────────────────────────────────────────────┐
│ status            │ online                                        │
│ name              │ kittypau-iot                                  │
│ namespace         │ default                                       │
│ version           │ 1.0.0                                         │
│ restarts          │ 1                                             │
│ uptime            │ 24h                                           │
│ script path       │ /home/ubuntu/kittypau/index.js                │
│ script args       │ N/A                                           │
│ error log path    │ /home/ubuntu/.pm2/logs/kittypau-iot-error.log │
│ out log path      │ /home/ubuntu/.pm2/logs/kittypau-iot-out.log   │
│ pid path          │ /home/ubuntu/.pm2/pids/kittypau-iot-0.pid     │
│ interpreter       │ node                                          │
│ interpreter args  │ N/A                                           │
│ script id         │ 0                                             │
│ exec cwd          │ /home/ubuntu/kittypau                         │
│ exec mode         │ fork_mode                                     │
│ node.js version   │ 24.12.0                                       │
│ node env          │ N/A                                           │
│ watch & reload    │ ✘                                             │
│ unstable restarts │ 0                                             │
│ created at        │ 2026-01-08T21:22:53.385Z                      │
└───────────────────┴───────────────────────────────────────────────┘
 Actions available
┌────────────────────────┐
│ km:heapdump            │
│ km:cpu:profiling:start │
│ km:cpu:profiling:stop  │
│ km:heap:sampling:start │
│ km:heap:sampling:stop  │
└────────────────────────┘
 Trigger via: pm2 trigger kittypau-iot <action_name>

 Code metrics value
┌────────────────────────┬───────────┐
│ Used Heap Size         │ 21.06 MiB │
│ Heap Usage             │ 93.32 %   │
│ Heap Size              │ 22.57 MiB │
│ Event Loop Latency p95 │ 1.42 ms   │
│ Event Loop Latency     │ 0.49 ms   │
│ Active handles         │ 4         │
│ Active requests        │ 0         │
└────────────────────────┴───────────┘
 Divergent env variables from local env
┌────────────────┬───────────────────────────────────────┐
│ SSH_CONNECTION │ 186.189.112.96 57167 172.31.14.153 22 │
│ XDG_SESSION_ID │ 31                                    │
│ SSH_CLIENT     │ 186.189.112.96 57167 22               │
│ SSH_TTY        │ /dev/pts/6                            │
└────────────────┴───────────────────────────────────────┘

 Add your own code metrics: http://bit.ly/code-metrics
 Use `pm2 logs kittypau-iot [--lines 1000]` to display logs
 Use `pm2 env 0` to display environment variables
 Use `pm2 monit` to monitor CPU and Memory usage kittypau-iot
ubuntu@ip-172-31-14-153:~/kittypau$ pm2 logs kittypau-iot --lines 200
[TAILING] Tailing last 200 lines for [kittypau-iot] process (change the value with --lines option)
/home/ubuntu/.pm2/logs/kittypau-iot-out.log last 200 lines:
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)
0|kittypau | 🟢 Conectado a Neon (pool listo)

/home/ubuntu/.pm2/logs/kittypau-iot-error.log last 200 lines:
0|kittypau |           {
0|kittypau |             "code": "invalid_type",
0|kittypau |             "expected": "string",
0|kittypau |             "received": "undefined",
0|kittypau |             "path": [
0|kittypau |               "status"
0|kittypau |             ],
0|kittypau |             "message": "Required"
0|kittypau |           }
0|kittypau |         ],
0|kittypau |         "name": "ZodError"
0|kittypau |       }
0|kittypau |     ],
0|kittypau |     "path": [],
0|kittypau |     "message": "Invalid input"
0|kittypau |   }
0|kittypau | ]
0|kittypau | ❌ Error procesando mensaje: column "ts" of relation "sensor_readings" does not exist
0|kittypau | ❌ Error procesando mensaje: [
0|kittypau |   {
0|kittypau |     "code": "invalid_union",
0|kittypau |     "unionErrors": [
0|kittypau |       {
0|kittypau |         "issues": [
0|kittypau |           {
0|kittypau |             "code": "invalid_type",
0|kittypau |             "expected": "string",
0|kittypau |             "received": "object",
0|kittypau |             "path": [],
0|kittypau |             "message": "Expected string, received object"
0|kittypau |           }
0|kittypau |         ],
0|kittypau |         "name": "ZodError"
0|kittypau |       },
0|kittypau |       {
0|kittypau |         "issues": [
0|kittypau |           {
0|kittypau |             "code": "invalid_type",
0|kittypau |             "expected": "string",
0|kittypau |             "received": "undefined",
0|kittypau |             "path": [
0|kittypau |               "status"
0|kittypau |             ],
0|kittypau |             "message": "Required"
0|kittypau |           }
0|kittypau |         ],
0|kittypau |         "name": "ZodError"
0|kittypau |       }
0|kittypau |     ],
0|kittypau |     "path": [],
0|kittypau |     "message": "Invalid input"
0|kittypau |   }
0|kittypau | ]
0|kittypau | ❌ Error procesando mensaje: column "ts" of relation "sensor_readings" does not exist
0|kittypau | ❌ Error procesando mensaje: column "ts" of relation "sensor_readings" does not exist
0|kittypau | ❌ Error procesando mensaje: [
0|kittypau |   {
0|kittypau |     "code": "invalid_union",
0|kittypau |     "unionErrors": [
0|kittypau |       {
0|kittypau |         "issues": [
0|kittypau |           {
0|kittypau |             "code": "invalid_type",
0|kittypau |             "expected": "string",
0|kittypau |             "received": "object",
0|kittypau |             "path": [],
0|kittypau |             "message": "Expected string, received object"
0|kittypau |           }
0|kittypau |         ],
0|kittypau |         "name": "ZodError"
0|kittypau |       },
0|kittypau |       {
0|kittypau |         "issues": [
0|kittypau |           {
0|kittypau |             "code": "invalid_type",
0|kittypau |             "expected": "string",
0|kittypau |             "received": "undefined",
0|kittypau |             "path": [
0|kittypau |               "status"
0|kittypau |             ],
0|kittypau |             "message": "Required"
0|kittypau |           }
0|kittypau |         ],
0|kittypau |         "name": "ZodError"
0|kittypau |       }
0|kittypau |     ],
0|kittypau |     "path": [],
0|kittypau |     "message": "Invalid input"
0|kittypau |   }
0|kittypau | ]
0|kittypau | ❌ Error procesando mensaje: column "ts" of relation "sensor_readings" does not exist
0|kittypau | ❌ Error procesando mensaje: column "ts" of relation "sensor_readings" does not exist
0|kittypau | ❌ Error procesando mensaje: [
0|kittypau |   {
0|kittypau |     "code": "invalid_union",
0|kittypau |     "unionErrors": [
0|kittypau |       {
0|kittypau |         "issues": [
0|kittypau |           {
0|kittypau |             "code": "invalid_type",
0|kittypau |             "expected": "string",
0|kittypau |             "received": "object",
0|kittypau |             "path": [],
0|kittypau |             "message": "Expected string, received object"
0|kittypau |           }
0|kittypau |         ],
0|kittypau |         "name": "ZodError"
0|kittypau |       },
0|kittypau |       {
0|kittypau |         "issues": [
0|kittypau |           {
0|kittypau |             "code": "invalid_type",
0|kittypau |             "expected": "string",
0|kittypau |             "received": "undefined",
0|kittypau |             "path": [
0|kittypau |               "status"
0|kittypau |             ],
0|kittypau |             "message": "Required"
0|kittypau |           }
0|kittypau |         ],
0|kittypau |         "name": "ZodError"
0|kittypau |       }
0|kittypau |     ],
0|kittypau |     "path": [],
0|kittypau |     "message": "Invalid input"
0|kittypau |   }
0|kittypau | ]
0|kittypau | ❌ Error procesando mensaje: column "ts" of relation "sensor_readings" does not exist
0|kittypau | ❌ Error procesando mensaje: [
0|kittypau |   {
0|kittypau |     "code": "invalid_union",
0|kittypau |     "unionErrors": [
0|kittypau |       {
0|kittypau |         "issues": [
0|kittypau |           {
0|kittypau |             "code": "invalid_type",
0|kittypau |             "expected": "string",
0|kittypau |             "received": "object",
0|kittypau |             "path": [],
0|kittypau |             "message": "Expected string, received object"
0|kittypau |           }
0|kittypau |         ],
0|kittypau |         "name": "ZodError"
0|kittypau |       },
0|kittypau |       {
0|kittypau |         "issues": [
0|kittypau |           {
0|kittypau |             "code": "invalid_type",
0|kittypau |             "expected": "string",
0|kittypau |             "received": "undefined",
0|kittypau |             "path": [
0|kittypau |               "status"
0|kittypau |             ],
0|kittypau |             "message": "Required"
0|kittypau |           }
0|kittypau |         ],
0|kittypau |         "name": "ZodError"
0|kittypau |       }
0|kittypau |     ],
0|kittypau |     "path": [],
0|kittypau |     "message": "Invalid input"
0|kittypau |   }
0|kittypau | ]
0|kittypau | ❌ Error procesando mensaje: column "ts" of relation "sensor_readings" does not exist
0|kittypau | ❌ Error procesando mensaje: column "ts" of relation "sensor_readings" does not exist
0|kittypau | ❌ Error procesando mensaje: [
0|kittypau |   {
0|kittypau |     "code": "invalid_union",
0|kittypau |     "unionErrors": [
0|kittypau |       {
0|kittypau |         "issues": [
0|kittypau |           {
0|kittypau |             "code": "invalid_type",
0|kittypau |             "expected": "string",
0|kittypau |             "received": "object",
0|kittypau |             "path": [],
0|kittypau |             "message": "Expected string, received object"
0|kittypau |           }
0|kittypau |         ],
0|kittypau |         "name": "ZodError"
0|kittypau |       },
0|kittypau |       {
0|kittypau |         "issues": [
0|kittypau |           {
0|kittypau |             "code": "invalid_type",
0|kittypau |             "expected": "string",
0|kittypau |             "received": "undefined",
0|kittypau |             "path": [
0|kittypau |               "status"
0|kittypau |             ],
0|kittypau |             "message": "Required"
0|kittypau |           }
0|kittypau |         ],
0|kittypau |         "name": "ZodError"
0|kittypau |       }
0|kittypau |     ],
0|kittypau |     "path": [],
0|kittypau |     "message": "Invalid input"
0|kittypau |   }
0|kittypau | ]

^C
ubuntu@ip-172-31-14-153:~/kittypau$ pm2 env 0
namespace: default
km_link: false
vizion_running: false
NODE_APP_INSTANCE: 0
SHELL: /bin/bash
PWD: /home/ubuntu/kittypau
LOGNAME: ubuntu
XDG_SESSION_TYPE: tty
HOME: /home/ubuntu
LANG: C.UTF-8
LS_COLORS: rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=00:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.avif=01;35:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:*~=00;90:*#=00;90:*.bak=00;90:*.crdownload=00;90:*.dpkg-dist=00;90:*.dpkg-new=00;90:*.dpkg-old=00;90:*.dpkg-tmp=00;90:*.old=00;90:*.orig=00;90:*.part=00;90:*.rej=00;90:*.rpmnew=00;90:*.rpmorig=00;90:*.rpmsave=00;90:*.swp=00;90:*.tmp=00;90:*.ucf-dist=00;90:*.ucf-new=00;90:*.ucf-old=00;90:
SSH_CONNECTION: 186.189.112.96 57167 172.31.14.153 22
LESSCLOSE: /usr/bin/lesspipe %s %s
XDG_SESSION_CLASS: user
TERM: xterm-256color
LESSOPEN: | /usr/bin/lesspipe %s
USER: ubuntu
SHLVL: 1
XDG_SESSION_ID: 31
XDG_RUNTIME_DIR: /run/user/1000
SSH_CLIENT: 186.189.112.96 57167 22
XDG_DATA_DIRS: /usr/local/share:/usr/share:/var/lib/snapd/desktop
PATH: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
DBUS_SESSION_BUS_ADDRESS: unix:path=/run/user/1000/bus
SSH_TTY: /dev/pts/6
OLDPWD: /home/ubuntu
_: /usr/bin/pm2
PM2_USAGE: CLI
PM2_HOME: /home/ubuntu/.pm2
unique_id: 1c86f733-ce03-4e2e-b360-56be17db3d0e
version: 1.0.0
node_version: 24.12.0
ubuntu@ip-172-31-14-153:~/kittypau$ ls -lah .env
cat .env
-rw-rw-r-- 1 ubuntu ubuntu 452 Jan  8 20:12 .env
# AWS IoT
AWS_IOT_ENDPOINT=a3o1jhmmwxnm4z-ats.iot.us-east-2.amazonaws.com
AWS_IOT_TOPIC=kittypau/#

# Cert paths (los cargamos en el próximo paso)
AWS_CERT=/home/ubuntu/kittypau/certs/device.pem.crt
AWS_KEY=/home/ubuntu/kittypau/certs/private.pem.key
AWS_CA=/home/ubuntu/kittypau/certs/AmazonRootCA1.pem

# Neon
DATABASE_URL=postgresql://neondb_owner:npg_iVL1xhT6ICwp@ep-polished-art-adllyxom-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
ubuntu@ip-172-31-14-153:~/kittypau$ printenv | grep -E "AWS|NEON|DATABASE|MQTT|IOT"
ubuntu@ip-172-31-14-153:~/kittypau$