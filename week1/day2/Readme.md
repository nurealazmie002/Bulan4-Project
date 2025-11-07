## 1. Jelaskan konsep dasar React Native sebagai framework cross-platform, termasuk perbedaan utamanya dengan React untuk web. Sertakan penjelasan singkat tentang peran New Architecture di React Native v0.80 dan bagaimana hal itu memengaruhi performa aplikasi mobile.

React Native adalah framework dari Meta yang memungkinkan kita membuat aplikasi Android dan iOS hanya dengan JavaScript atau TypeScript, menggunakan konsep React.
Berbeda dengan React Web yang memakai HTML dan CSS, React Native menggunakan komponen native seperti View, Text, dan Button sehingga tampilannya benar-benar terasa seperti aplikasi native, bukan webview.

React Native menggunakan beberapa komponen utama:

Yoga Layout Engine untuk layout bergaya Flexbox.

Metro Bundler untuk menggabungkan kode dan aset.

Bridge atau JSI untuk komunikasi antara kode JavaScript dan native.

Pada versi v0.80, React Native memperkenalkan New Architecture yang mengganti sistem Bridge lama menjadi JSI (JavaScript Interface).
JSI memungkinkan komunikasi langsung dan lebih cepat antara JavaScript dan kode native.
Akibatnya, performa meningkat signifikan, animasi lebih halus, dan waktu respon lebih cepat.
Versi ini juga memakai Fabric Renderer dan TurboModules, yang membuat startup aplikasi lebih ringan.



## 2. Bandingkan React Native CLI dan Expo dari segi arsitektur serta proses build. Diskusikan satu kelebihan dan satu kekurangan masing-masing, lalu berikan contoh skenario proyek di mana Anda akan memilih salah satu di atas.

React Native CLI memberikan akses penuh ke folder native (android/ dan ios/) sehingga kita bisa menulis atau memodifikasi kode Java/Kotlin/Swift. Proses build dilakukan secara lokal menggunakan Gradle atau Xcode.
Expo sebaliknya, menyembunyikan kode native dan memberikan lingkungan siap pakai dengan build berbasis cloud atau Expo Go untuk preview cepat.

Kelebihan React Native CLI adalah fleksibilitas tinggi dan performa maksimal karena kita bisa ubah kode native langsung. Kekurangannya, setup awal lebih rumit dan waktu build lebih lama.
Kelebihan Expo adalah sangat mudah dipasang dan cocok untuk pemula atau prototyping cepat. Kekurangannya, terbatas pada library bawaan Expo dan kadang perlu “eject” ke CLI jika butuh fitur native khusus.

Contoh:

Gunakan React Native CLI jika ingin membuat aplikasi kompleks seperti app dengan Bluetooth atau kamera AR.

Gunakan Expo jika ingin cepat membuat prototipe atau aplikasi sederhana seperti katalog produk.



## 3. Dalam setup environment Android menggunakan command-line tools, jelaskan mengapa SDK Platforms (android-35), Build Tools (35.0.0), dan Platform Tools masing-masing diperlukan untuk React Native. Berikan contoh bagaimana ketidakhadiran salah satu komponen tersebut dapat menyebabkan masalah saat menjalankan proyek pertama Anda di VS Code.

SDK Platforms (android-35) menyediakan API Android 15 agar aplikasi bisa dikompilasi sesuai versi terbaru. Tanpa ini, build akan gagal dengan pesan “target with API level 35 not found.”

Build Tools (35.0.0) berisi alat penting seperti aapt2 dan apksigner yang dibutuhkan untuk mengompilasi dan menandatangani APK. Tanpanya, proses build berhenti di tengah.

Platform Tools berisi adb (Android Debug Bridge) untuk menginstal aplikasi ke emulator atau perangkat fisik. Jika hilang, VS Code tidak bisa menjalankan app ke device.

Contoh masalah: jika adb belum diinstal, saat menjalankan npx react-native run-android, aplikasi tidak akan bisa terkoneksi ke emulator.



## 4. Bahas prasyarat umum setup React Native CLI v0.80, seperti Node.js, Watchman, dan Yarn, termasuk alasan mengapa masing-masing diperlukan untuk menjembatani JavaScript ke native runtime.

Node.js digunakan sebagai runtime JavaScript dan menjalankan Metro Bundler untuk memproses file JS ke bentuk yang dimengerti native.

Watchman (buatan Facebook) memantau perubahan file, sehingga fitur Hot Reload bisa langsung memperbarui tampilan tanpa restart aplikasi.

Yarn berfungsi sebagai pengelola dependensi yang cepat dan stabil untuk proyek React Native.

Tanpa salah satu dari tiga komponen ini, komunikasi antara kode JavaScript dan native akan terganggu — misalnya, Metro Bundler tidak bisa jalan tanpa Node.js.



## 5. Deskripsikan struktur folder utama dalam proyek React Native CLI, termasuk fungsi folder android/, ios/, dan file-file JS seperti App.js serta metro.config.js. Jelaskan bagaimana struktur ini mendukung pengembangan cross-platform dan navigasi di VS Code.


Struktur proyek React Native CLI biasanya seperti ini:

MyFirstApp/
├── android/        → Kode native Android (Java/Kotlin, Gradle config)
├── ios/            → Kode native iOS (Swift/Objective-C, Xcode project)
├── src/            → Kode utama React (komponen, screen, assets)
├── App.js          → Komponen utama aplikasi (root component)
├── index.js        → Entry point yang mendaftarkan App ke native runtime
├── metro.config.js → Konfigurasi bundler Metro
├── package.json    → Menyimpan dependensi dan script proyek
└── README.md       → Dokumentasi proyek

Folder android/ dan ios/ menyimpan kode native untuk masing-masing platform, sementara file JavaScript (App.js, index.js) berfungsi sebagai logika utama yang sama di kedua platform.
Struktur ini mendukung pengembangan cross-platform karena kita hanya perlu menulis satu kode React, lalu sistem akan menerjemahkannya ke native Android dan iOS.
Di VS Code, struktur ini memudahkan navigasi antar file, debugging, dan pemisahan antara kode logika dan kode platform.