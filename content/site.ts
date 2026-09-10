import {
  proposalRoleDefinitions,
  proposalRoleIdAliases,
} from "@/content/proposal-roles"

export const siteConfig = {
  couple: {
    bride: "Juvy S. Delgaco", //Noenyl Bryle M. Gonzaga
    brideNickname: "Juvy", //Ltryl
    groom: "Jayson A. Papa", //Ltryl B. Benitez
    groomNickname: "Jayson",
    monogram:"/monogram/monogram.png" ,//Ltryl
    backgroundMusic:"/background_music/Palagi - Tj Monterde  Violin Cover.mp3"
  },
  googleAPI:{
    messageForm: "https://docs.google.com/forms/d/e/1FAIpQLSc9zfh2TNkiZoEm2o4WE6BIpHMuiqbhWpiIZPx3HvyQo_-zTw/formResponse",   //done
    message: "https://script.google.com/macros/s/AKfycbyAWDC5cghN91R7rsqsdKosXrEO5ID0LAEPYudF0EHEvvdL8F4QMynF_5JhojXjkx4Q/exec",  //done
    guestList: "https://script.google.com/macros/s/AKfycbwSgwsIqCfwSQaL_ACVyQlJ1VuPEGcYZdTw_X6EaK0vGnOv85VSOt73sO-4VKYVnH5m/exec",  //done
    guestRequest: "https://script.google.com/macros/s/AKfycbw4YabqsDct9QHQTANthXmtVESU_pOafDTdvACCBoeTEl8KS5sqgV9l9Cd36ES2MYvM/exec",   //done
    entourage: "https://script.google.com/macros/s/AKfycbzO_HgD5l5H2RmGVsOVp3M1-6HDRe-0zIo9DiaH_ALWtM1urIjZP5IkpzX_0bIxRdz6/exec",  //done
    sponsors: "https://script.google.com/macros/s/AKfycbxejBXFT3hVZz1ziTqRcd2g8gy2NgpEEfW6po4fNkuIqhZi5ppVnh3qBhFamlZOfSNE/exec",  //done 
    proposalResponses: "https://script.google.com/macros/s/AKfycbwIUDKMoMIHVwbmr6KbgmBtlGRpMGj1Z9maeHSEwsFaXNi0dAH8WYhqbtiAfg_p5D4lgw/exec", // uses entourage script with action: proposal
    weddingDetails: "https://script.google.com/macros/s/AKfycbwJiEsJKgPaY0ro5G6cOsgJ_vR84bIrfdgugJY-zpI-HyqM9qK6bgOfxy_vbxNpv-9T/exec",   //done
////google share 
    googleShare: "https://docs.google.com/spreadsheets/d/1HThE9SkrMxV7v-LzvPAt8fOMJ0JHR_NKqdc3_CEFkGg/edit?usp=sharing", 
  },
  wedding: {
    date: "September 24, 2026",
    time: "8:00 AM",
    venue: "Holy Cross Parish",
    tagline: "are getting married!!!!!",
    theme: "Our wedding palette is inspired by timeless elegance. Motif Colors: Midnight Navy, Deep Navy, Slate Navy, Antique Gold, Champagne",
    motif: "#04103B, #192030, #364061, #AB832E, #DDBA7A",
  },
  proposal: {
    // Use "Maid of Honor" for unmarried, "Matron of Honor" for married
    honorAttendant: "Matron of Honor" as "Matron of Honor" | "Maid of Honor",
    roles: proposalRoleDefinitions,
    roleIdAliases: proposalRoleIdAliases,
  },
  details: {
    rsvp: {
      deadline: "November 15, 2026",
      coordinator: "Juvy / Jayson",
      phone: "to be announced",
    },
  },
  contact: {
    bridePhone: "to be announced",
    groomPhone: "to be announced",
    email: "to be announced",
  },
  giftRegistry: {
    QR_1:{
    id: "BPI",
    src: "/QR/new-BPI.png",
    label: "BPI bank",
    accountNumber: "JUVYD : ******** 1648",
    }
  },
  ceremony: {
    location: "Holy Cross Parish",
    venue: "1, San Esteban, Nabua, Camarines Sur, Philippines",
    map: "https://maps.app.goo.gl/AocmtuurjoLwFAMz5",
    date: "September 24, 2026",
    day: "Thursday",
    time: "8:00 AM",
    entourageTime: "7:00 AM",
    guestsTime: "7:30 AM",
    image: ["/Details/ceremony.png", "/Details/ceremony2.png"],
  },
  reception: {
    location: "DELGACO RESIDENCE",
    venue: "Zone 2 San Vicente Ogbon Nabua Camarines Sur",
    map: "https://maps.app.goo.gl/djZ317evDTZX4ghG9",
    date: "September 24, 2026",
    day: "Thursday",
    time: "1:00 PM",
    image: ["/Details/ceremony.png", "/Details/ceremony2.png"],
  },
  dressCode: {
    theme: "CASUAL",
    sponsors: {
      title: "Sponsors",
      ninang: {
        label: "Ninang",
        description: "Long gown in the shade of silver gray.",
        image: "/Details/Ninang.png",
        palette: ["#04103B", "#192030", "#364061", "#AB832E", "#DDBA7A"],
      },
      ninong: {
        label: "Ninong",
        description: "Champagne or Cream Barong Tagalog and navy slacks.",
        image: "/Details/Ninong.png",
        palette: ["#DDBA7A", "#04103B"],
      },
    },
    entourage: {
      title: "Entourage",
      bridesmaid: {
        label: "Bridesmaids",
        description: "Long gown that suits our color motif.",
        image: "/Details/bridesmaid.png",
        palette: ["#04103B", "#192030", "#364061", "#AB832E", "#DDBA7A"],
      },
      groomsmen: {
        label: "Groomsmen",
        description: "Long sleeve Champagne or Cream Barong Tagalog and navy slacks.",
        image: "/Details/Groomsmen.png",
        palette: ["#DDBA7A", "#04103B"],
      },
    },
    guests: {
      title: "Guests",
      label: "Guests",
      description: "Casual attire in our sage palette. Kindly avoid white.",
      image: "/Details/guest.png",
      palette: ["#04103B", "#192030", "#364061", "#AB832E", "#DDBA7A"],
    },
    paletteNote:
      "Casual is most welcome. To keep the day cohesive, we kindly encourage guests to dress in Sage Hint, Mint, Sage, Moss, or Evergreen. White is reserved for the couple.",
    closing:
      "Thank you for helping us bring our wedding vision to life. We can't wait to celebrate with you!",
    note: "Guests are most welcome in casual attire within our sage palette. Kindly avoid white.",
  },
  narratives: {
    ourStory: `CHAPTER 1
How We Met

Every love story begins differently.
Some start with a grand moment.
Some with a single conversation.
Ours started quietly.

It was 2021.
At that time, I was still healing from a heartbreak. Hindi ako naghahanap ng bagong relasyon. Sa totoo lang, mas gusto kong ayusin muna ang sarili ko at magpatuloy sa buhay.

One day, I went to Binondo, where our YouTube partner was staying.
That was the first time I saw Christine.
We didn't talk.
We weren't introduced.
She was simply there.

I never imagined that years later, God would write a different ending to that ordinary day.

Life went on.
For almost three years, I remained single.
I wasn't looking for someone else.
I believed that if God had someone prepared for me, He would bring her into my life at the right time.

Then came the day everything began to change.
Christine got baptized at our church.
Later that day, one of our churchmates casually asked if I could accompany her to the SM terminal.
It seemed like a small favor.
But looking back now, I believe God was quietly opening a door.

That short trip became our very first real conversation.
Nothing extraordinary.
Just two people talking on the way to the terminal.

After she got home, I sent her a simple message.
"Ingat sa pag-uwi."

It wasn't a pickup line.
It wasn't meant to impress her.
It was simply genuine concern.

Looking back now, I smile whenever I remember that message.
Because I didn't know it then...
That simple "Ingat" would become the beginning of the greatest love story God would ever write for us.

Reflection
Sometimes God doesn't begin a love story with fireworks.
Sometimes...
He begins it with a simple ride, a short conversation, and one sincere message.
Because when the time is right...
He makes everything happen.

Isaiah 60:22`,
    groom: `The first time Mark saw Catherine, time seemed to slow down. It was an ordinary day that instantly became unforgettable: one smile, one hello, and suddenly his world had a new center. He didn't have the perfect words ready, but he knew he had met someone who felt like home.

Early conversations turned into late-night talks, sharing dreams, favorite meals, and whispered prayers for a future together. With every small adventure—coffee runs, long drives, quiet walks—Mark found himself choosing her over and over again. He loved how she laughed freely, how she listened with her whole heart, and how her faith steadied him.

There were seasons of distance and long workdays, but every reunion reminded him why he stayed patient: because Catherine was worth every mile and every minute apart. When he finally knelt to ask for her hand, it wasn't a question of "if," only "when can we start forever?"`,
    bride: `Catherine remembers the first time Mark said her name. It was gentle but sure, a kindness that made her feel both seen and safe. In that softness, she found a partner who met her with the same grace she prayed to give.

Mark's steadiness won her heart: the way he showed up, even when schedules were tight, and how he always found lightness in the small things. He celebrated her wins, held space for her worries, and never hesitated to choose "us" in every decision.

Now, as they prepare to say yes before God and the people they love most, Catherine is grateful for the patience, humor, and hope Mark brings to every day. She knows this next chapter is just the start of the love story they get to write together.`,
  },
  colors: {
    primary: "#04103B",
    secondary: "#DDBA7A",
  },
  playlist: {
    title: "A Playlist from our hearts",
    subtitle: "Songs that have been part of our journey together",
    playlistName: "Jen and Tin Wedding",
    spotifyTitle: "Jen and Tin Wedding",
    curator: "Lance",
    coverUrl:
      "https://image-cdn-ak.spotifycdn.com/image/05e34086ac8a4dc1",
    embedUrl:
    //https://open.spotify.com/embed/playlist/58WOfUVSty9PSetlcVNRsr?utm_source=generator&si=0668eb4188c6446d
      "https://open.spotify.com/embed/playlist/46fNK9rWuddDg3afoOS22T?utm_source=generator&si=05e34086ac8a4dc1",
    spotifyUrl: "https://open.spotify.com/playlist/46fNK9rWuddDg3afoOS22T",
    tracks: [
      {
        title: "Ikaw At Ako",
        artist: "TJ Monterde",
        duration: "04:06",
        uri: "spotify:track:46fNK9rWuddDg3afoOS22T",
        previewUrl:
          "https://p.scdn.co/mp3-preview/05e34086ac8a4dc1",
      },
      {
        title: "Palagi - TJxKZ Version",
        artist: "TJ Monterde, KZ Tandingan",
        duration: "04:01",
        uri: "spotify:track:4WgViu9gw3qYOr3iF9OuLG",
        previewUrl:
          "https://p.scdn.co/mp3-preview/05e34086ac8a4dc1",
      },
      {
        title: "Tahanan - Wedding Version",
        artist: "El Manu, Jessy Kang",
        duration: "04:54",
        uri: "spotify:track:2zxXtgZG2kd7rtbG2T2mQn",
        previewUrl:
          "https://p.scdn.co/mp3-preview/05e34086ac8a4dc1",
      },
      {
        title: "Beautiful In White",
        artist: "Shane Filan",
        duration: "03:52",
        uri: "spotify:track:43wROOsAEK0F3Fu46Vjn7W",
        previewUrl:
          "https://p.scdn.co/mp3-preview/05e34086ac8a4dc1",
      },
      {
        title: "Wedding Dress",
        artist: "TAEYANG",
        duration: "04:02",
        uri: "spotify:track:2NO4CA2TFvhGeg7XMz8PmT",
        previewUrl:
          "https://p.scdn.co/mp3-preview/05e34086ac8a4dc1",
      },
      {
        title: "Handa Na",
        artist: "Noah Raquel",
        duration: "03:04",
        uri: "spotify:track:3iF3k047ZbFs4p5GM0Q7LL",
        previewUrl:
          "https://p.scdn.co/mp3-preview/05e34086ac8a4dc1",
      },
    ],
  },
  snapShare: {
    googleDriveLink:
      "https://drive.google.com/drive/folders/1RkdZxTxgWR354PpqkdEe79LU7zujFST9?usp=sharing",
    albumQR: "/QR/AlbumQR.png",
    hashtag: ["#JaysonJuvyWedding"],
    instructions: "Please scan this QR Code and upload the photos and videos you have taken during our wedding reception. We are delighted to see your snaps too!",
  },
  accommodation: {
    coordinator: {
      name: "Jayson / Juvy",
      phone: "to be announced",
    },
    hotels: [
      {
        name: "La Luna Resort",
        discount: "Offered 20% discount for early booking",
        facebook: "https://www.facebook.com/lalunabeachresortofficial",
      },
      {
        name: "GOSAM Beach Resort",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100083461714073",
      },
      {
        name: "Calicoan Villa",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/CalicoanVilla",
      },
      {
        name: "G Camp Beachfront",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100085772194096",
      },
      {
        name: "Punta Viajero Beach Resort",
        discount: "Offered 15% discount",
        phone: "0932 214 6408",
        facebook: "https://www.facebook.com/puntoviajeroresort",
      },
      { name: "Balay Sunset" },
      { name: "Balay Pacifico" },
      { name: "Casa Nala" },
      { name: "The Grey Inn" },
    ],
    carRentals: [
      {
        name: "Apex Car Rental Tacloban",
        facebook: "https://www.facebook.com/profile.php?id=61574882327115",
      },
      {
        name: "Cassey Wheels Car Rental",
        facebook: "https://www.facebook.com/search/top?q=casseywheels%20car%20rental",
      },
    ],
  },
}
