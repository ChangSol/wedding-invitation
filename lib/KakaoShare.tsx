export function kakaoShare() {
  window.Kakao.Share.sendDefault({
    objectType: "location",
    address: "경기 부천시 부천로 3-1 채림웨딩홀",
    addressTitle: "채림웨딩홀",
    content: {
      title:
        `${process.env.NEXT_PUBLIC_GROOM_NAME}` +
        " ❤️ " +
        `${process.env.NEXT_PUBLIC_BRIDE_NAME}` +
        " 우리 결혼합니다!",
      description: "24.02.24 (토) 오후 1시 \n채림웨딩홀 6층 컨벤션홀",
      imageUrl: "https://wedding-invitation.chang-ju.shin-hee.com/pictures/1.jpg",
      link: {
        mobileWebUrl: "https://wedding-invitation.chang-ju.shin-hee.com",
        webUrl: "https://wedding-invitation.chang-ju.shin-hee.com",
      },
    },
    // social: {
    //   likeCount: 1112,
    //   commentCount: 629,
    //   sharedCount: 604,
    // },
    buttons: [
      {
        title: "청첩장 보기",
        link: {
          mobileWebUrl: "https://wedding-invitation.chang-ju.shin-hee.com",
          webUrl: "https://wedding-invitation.chang-ju.shin-hee.com",
        },
      },
    ],
    installTalk: true,
  });
}
