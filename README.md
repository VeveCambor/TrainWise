# 🧠 TrainWise

**TrainWise** je fullstack aplikace pro plánování a sledování fitness tréninků s pomocí AI asistenta. Umožňuje personalizované generování tréninkových plánů, sledování pokroku, zapisování poznámek a motivaci pomocí odměn. Vychází z mých vlastních potřeb, kdy si musím tréninky přizpůsobovat a chci mít přehled o svém pokroku.

 ---![E1C09525-4153-45FE-A33E-85989FC8F92D](https://github.com/user-attachments/assets/199e7ee2-03f3-408d-bedd-da3ad8f3b14b)


## ✨ Funkce

- ✅ Registrace a přihlášení (JWT autentizace)
- 🧍‍♀️ Uživatelský profil (cíl, parametry, zdravotní omezení)
- 🤖 AI generovaný týdenní tréninkový plán (JSON)
- 📋 Editace a uložení tréninkového checklistu
- 📈 Sledování pokroku (váha, výkon, poznámky)
- 🎖️ Odměny a měsíční souhrny (budoucí verze)
- 🧠 Lokálně běžící SQLite databáze přes EF Core

---

## 🛠 Použité technologie

- **Frontend:** React (plánováno)
- **Backend:** ASP.NET Core (.NET 8)
- **DB:** SQLite + Entity Framework Core
- **Editor:** Cursor (AI-asistovaný vývoj)
- **Autentizace:** JWT
- **AI:** GPT-4 API (OpenAI, výstup ve formátu JSON)

---

## 🚀 Jak projekt spustit lokálně

1. Klonuj repozitář:
   ```bash
   git clone https://github.com/VeveCambor/TrainWise.git
   
2. Nainstaluj závislosti a spusť backend:
    ```bash
    dotnet restore
    dotnet ef database update
    dotnet run
    
3. Nainstaluj závislosti a spusť frontend:
    ```bash
    npm install
    npm run dev

## 🧪 Testovací účet (později bude přidáná registrace)

jméno: Wewika
heslo: wewa123

## 📦 Deployment

Plánováno:
	•	Backend: Railway nebo Render
	•	Frontend: Vercel

📅 Vývoj probíhá ve fázích
	•	MVP – registrace, profil, AI plán
	•	Fáze 2 – progres, odměny, poznámky
	•	Fáze 3 – dlouhodobé zhodnocení, PDF exporty
	•	Fáze 4 – zabezpečení, reset hesla

## 👩‍💻 Autor

Frontend & Fullstack vývoj: @VeveCambor
UX/UI design + AI integrace ✨

📄 Licence

MIT – open-source projekt pro vzdělávací a prezentační účely.
