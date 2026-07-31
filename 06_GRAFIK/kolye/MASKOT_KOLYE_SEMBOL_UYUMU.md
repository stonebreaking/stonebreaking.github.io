# 🎭 MASKOTLARDA KOLYE + SEMBOL UYUMU

**Mevcut Durum:** M-005 (Kolye Referansı) hazır  
**Hedef:** M-006 ile mühürleme

## RESMİ KOLYE (Tüm maskotlarda kullanılacak)
Dosya: `referans/kolye_referans_base.png`

Bu kolye **kadın ve erkek maskotların göğsüne** tam olarak yerleştirilecek.

## SEMBOL YERLEŞİMİ

Kolye referansındaki 4 sembolden **bir tanesi** her karaktere atanacak.

Sembol, kolyenin **içine** şu şekilde yerleştirilecek:
- Kolyenin tam ortasına veya hafif aşağısına
- Sembolün rengi kolye ile uyumlu olacak
- Sembolün boyutu kolyenin iç alanına tam oturacak şekilde ölçeklenecek

## ENTEGRASYON KURALLARI (Zorunlu)

1. **Kolye** = Her zaman `kolye_referans_base.png` (değiştirilemez)
2. **Sembol** = Karakterin elementine göre seçilen sembol (kolye içine)
3. **Kadın Maskot** ve **Erkek Maskot** aynı kolye + aynı sembol düzeni kullanacak
4. En-boy oranı ve kolye boyutu **%100 korunacak**
5. Sembol, kolyenin tasarımına zarar vermeyecek şekilde şeffaf katman olarak eklenecek

## KLASÖR YAPISI (Hazır)

```
06_GRAFIK/kolye/entegre_maskot/
├── KOR/
│   ├── README.md
│   └── (female_kor_entegre.png + male_kor_entegre.png gelecek)
├── BAAM/
├── MAND/
└── ZEPY/
```

## KULLANIM TALİMATI

Kullanıcı sembol atamasını yaptıktan sonra:
1. Her karakter için "Kolye + Sembol" kombinasyonu tanımlanır
2. Gerçek maskot görselleri geldiğinde buraya entegre edilmiş versiyonlar eklenir
3. M-006 ile resmen mühürlenir

