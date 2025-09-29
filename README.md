# 📊 Finance Tracker (Frontend)

Modern bir **kişisel finans yönetimi uygulaması**.  
**Next.js + TypeScript + TailwindCSS + Chart.js** kullanılarak geliştirilmiştir.

---

## 🚀 Özellikler

- 🔑 **Authentication**: Kayıt ol, giriş yap, profil güncelle  
- 🏠 **Dashboard**: Hızlı erişim ve özetler  
- 📂 **Kategoriler**: Gelir / gider kategorilerini yönet  
- 💵 **Transactions**: Gelir ve gider hareketlerini ekleme, düzenleme, silme  
- 📊 **Analiz & Raporlar**: Pie chart, bar chart, transaction list  
- 🎨 **Responsive UI**: TailwindCSS ile modern tasarım  

---

## 📁 Proje Yapısı

/app
/analysis
/categories
/dashboard
/login
/profile
/register
/transactions

/components
/Analysis
/Transactions

/lib
auth.ts
categories.ts
transaction.ts


---

## 🔐 Auth Sayfaları

### **LoginPage**
- Kullanıcı giriş ekranı.  
- `loginUser` API çağrısı ile token alır.  
- Başarılı giriş → `/dashboard`.  Örnek giriş: "email": "seda@example.com", "password": "123456"

### **RegisterPage**
- Kullanıcı kayıt ekranı.  
- `registerUser` API çağrısı ile kullanıcı oluşturur.  
- Kayıt sonrası otomatik olarak **login sayfasına yönlendirir**.  

### **ProfilePage**
- Kullanıcı bilgilerini gösterir (**email, username**).  
- Şifre değişikliği yapılabilir.  
- Profil güncellemesi `updateProfile` API çağrısı ile yapılır.  

---

## 🏠 Dashboard

### **DashboardHome**
- Kullanıcıya **Hoşgeldin mesajı** gösterir.  
- Hızlı erişim kutuları:  
  - Kategoriler  
  - Hareketler  

---

## 📂 Kategoriler

### **CategoryPage**
- Kategori ekleme, güncelleme, silme.  
- Alanlar: **name, type (income/expense), priority, color**.  
- API fonksiyonları:  
  - `getCategories`  
  - `createCategory`  
  - `updateCategory`  
  - `deleteCategory`  

---

## 💵 Transactions

### **TransactionsPage**
- Tüm hareketlerin listelendiği ana sayfa.  
- İçerikler:  
  - `TransactionForm` → Yeni hareket ekleme / düzenleme  
  - `TransactionList` → Listeleme  
  - `TransactionFilter` → Filtreleme  
  - `TransactionTotals` → Özet  
  - `TransactionSummary` → Genel özet  

### **TransactionForm**
- Yeni hareket ekleme veya mevcut hareketi düzenleme.  
- Alanlar: **amount, type, category, note, date**.  

### **EditTransactionModal**
- Mevcut hareket için modal üzerinde düzenleme ekranı.  

### **TransactionFilter**
- Filtreleme kriterleri: **type, category, date**.  

---

## 📊 Analiz & Raporlar

### **AnalysisPage**
- **Gelir / gider bar chart**  
- **Kategori bazlı pie chart**  
- **İşlem listesi**  

### **TotalsChart**
- Bar chart: **Income, Expense, Balance**  

### **CategoryPieChart**
- Pie chart: **Kategori bazlı harcama**  

### **TransactionList (Analysis versiyonu)**
- İşlemlerin tablo halinde gösterimi.  

---

## ⚙️ API Bağlantıları

Tüm API işlemleri `/lib` klasöründe tanımlanır.

- **auth.ts** → `loginUser`, `registerUser`, `getProfile`, `updateProfile`  
- **categories.ts** → `getCategories`, `createCategory`, `updateCategory`, `deleteCategory`  
- **transaction.ts** → `getTransactions`, `createTransaction`, `updateTransaction`, `deleteTransaction`, `filterTransactions`, `getTotals`, `getSummary`  

---

## 🛠️ Teknolojiler

- [Next.js 13+](https://nextjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Chart.js](https://www.chartjs.org/)  

- [Axios / Fetch API](https://axios-http.com/)  

---

## ▶️ Çalıştırma

```bash
# bağımlılıkları yükle
npm install

# development başlat
npm run dev

# build al
npm run build

# production başlat
npm start
