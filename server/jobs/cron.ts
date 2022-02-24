import cron from 'node-cron'

cron.schedule('*/10 * * * * *', function () {
  // Lekérni a karbantartásokat

  // Lekérni a taskokat

  // Ha nincs Task egy karbantartásanak akkor
    // lekérni a periódust és az utolsó dátumot
    // lekérni a szükséges végzettséget
    // lekérni a userek végzettségét
    // ha van megfelelő akkor
      // ellenőrizni a normaidőt, ha belefér akkor létrehozni a taskot
    // ha nincs akkor visszaadni, hogy nincs megfelelő

  // Ha van leendő Task akkor semmit nem csinál
  
});