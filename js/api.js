/**
 * SmartShelf RetailTech - Core API & State Management
 * CSE122 - Phát triển ứng dụng Web cơ bản
 * Team 5 - 67KTPM1 (Trần Trọng Hoàng Anh, Nguyễn Quang Long, Nguyễn Văn Hân)
 */

const STORAGE_KEY = 'SMARTSHELF_DB_V2';

// Seed Initial Database if not exists
async function initDatabase() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    try {
      const isPagesDir = window.location.pathname.includes('/pages/');
      const dataUrl = isPagesDir ? '../assets/data/mock-db.json' : 'assets/data/mock-db.json';
      const res = await fetch(dataUrl);
      if (res.ok) {
        const initialData = await res.json();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        console.log('SmartShelf DB initialized from mock-db.json');
      } else {
        throw new Error('Fetch failed');
      }
    } catch (e) {
      console.warn('Fallback inline seed database activated:', e);
      const fallbackData = getFallbackSeed();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackData));
    }
  }
}

function getDatabase() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Database parse error:', e);
    }
  }
  return getFallbackSeed();
}

function saveDatabase(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function resetDatabase() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

// ---------------- PRODUCTS ----------------
function getProducts() {
  const db = getDatabase();
  return db.products || [];
}

function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === id);
}

function addProduct(product) {
  const db = getDatabase();
  product.id = 'PROD-' + Date.now().toString().slice(-4);
  product.status = product.stockQty <= 0 ? 'empty' : (product.stockQty <= product.minQty ? 'low' : 'normal');
  db.products.push(product);
  saveDatabase(db);
  return product;
}

function updateProduct(id, updatedFields) {
  const db = getDatabase();
  const index = db.products.findIndex(p => p.id === id);
  if (index !== -1) {
    db.products[index] = { ...db.products[index], ...updatedFields };
    const p = db.products[index];
    p.status = p.stockQty <= 0 ? 'empty' : (p.stockQty <= p.minQty ? 'low' : 'normal');
    saveDatabase(db);
    return db.products[index];
  }
  return null;
}

function deleteProduct(id) {
  const db = getDatabase();
  db.products = db.products.filter(p => p.id !== id);
  saveDatabase(db);
  return true;
}

// ---------------- SHELVES & ZONES ----------------
function getShelves() {
  const db = getDatabase();
  return db.shelves || [];
}

function getShelfById(id) {
  return getShelves().find(s => s.id === id || s.code === id);
}

function updateShelf(id, updatedFields) {
  const db = getDatabase();
  const index = db.shelves.findIndex(s => s.id === id);
  if (index !== -1) {
    db.shelves[index] = { ...db.shelves[index], ...updatedFields };
    saveDatabase(db);
    return db.shelves[index];
  }
  return null;
}

function getZones() {
  const db = getDatabase();
  return db.zones || [];
}

function addZone(zone) {
  const db = getDatabase();
  zone.id = 'Z' + (db.zones.length + 1).toString().padStart(2, '0');
  db.zones.push(zone);
  saveDatabase(db);
  return zone;
}

function updateZone(id, updatedFields) {
  const db = getDatabase();
  const index = db.zones.findIndex(z => z.id === id);
  if (index !== -1) {
    db.zones[index] = { ...db.zones[index], ...updatedFields };
    saveDatabase(db);
    return db.zones[index];
  }
  return null;
}

function deleteZone(id) {
  const db = getDatabase();
  db.zones = db.zones.filter(z => z.id !== id);
  saveDatabase(db);
  return true;
}

// ---------------- RESTOCK TASKS ----------------
function getRestockTasks() {
  const db = getDatabase();
  return db.restockTasks || [];
}

function addRestockTask(task) {
  const db = getDatabase();
  task.id = 'TASK-' + Math.floor(100 + Math.random() * 900);
  task.createdAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
  task.status = task.status || 'pending';
  db.restockTasks.unshift(task);
  saveDatabase(db);
  return task;
}

function updateRestockTask(id, updatedFields) {
  const db = getDatabase();
  const index = db.restockTasks.findIndex(t => t.id === id);
  if (index !== -1) {
    db.restockTasks[index] = { ...db.restockTasks[index], ...updatedFields };
    saveDatabase(db);
    return db.restockTasks[index];
  }
  return null;
}

function deleteRestockTask(id) {
  const db = getDatabase();
  db.restockTasks = db.restockTasks.filter(t => t.id !== id);
  saveDatabase(db);
  return true;
}

// ---------------- SHELF CHECKS ----------------
function getShelfChecks() {
  const db = getDatabase();
  return db.shelfChecks || [];
}

function addShelfCheck(check) {
  const db = getDatabase();
  check.id = 'CHK-' + Math.floor(100 + Math.random() * 900);
  check.checkedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
  db.shelfChecks.unshift(check);

  if (check.status === 'anomaly') {
    const shelf = db.shelves.find(s => s.id === check.shelfId || s.code === check.shelfCode);
    if (shelf) shelf.status = 'anomaly';
  }
  saveDatabase(db);
  return check;
}

// ---------------- USERS & AUTH ----------------
function getUsers() {
  const db = getDatabase();
  return db.users || [];
}

function getCurrentUser() {
  const raw = localStorage.getItem('SMARTSHELF_CURRENT_USER');
  if (raw) {
    try { return JSON.parse(raw); } catch (e) {}
  }
  return getUsers()[0];
}

function setCurrentUser(user) {
  localStorage.setItem('SMARTSHELF_CURRENT_USER', JSON.stringify(user));
}

function addUser(user) {
  const db = getDatabase();
  user.id = 'USR-' + (db.users.length + 1).toString().padStart(3, '0');
  db.users.push(user);
  saveDatabase(db);
  return user;
}

function updateUser(id, updatedFields) {
  const db = getDatabase();
  const idx = db.users.findIndex(u => u.id === id);
  if (idx !== -1) {
    db.users[idx] = { ...db.users[idx], ...updatedFields };
    saveDatabase(db);
    return db.users[idx];
  }
  return null;
}

function deleteUser(id) {
  const db = getDatabase();
  db.users = db.users.filter(u => u.id !== id);
  saveDatabase(db);
  return true;
}

// ---------------- CART ----------------
function getCart() {
  const raw = localStorage.getItem('SMARTSHELF_CART');
  if (raw) {
    try { return JSON.parse(raw); } catch (e) {}
  }
  return [];
}

function saveCart(cart) {
  localStorage.setItem('SMARTSHELF_CART', JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const product = getProductById(productId);
  if (!product) return cart;

  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      shelfCode: product.shelfId
    });
  }
  saveCart(cart);
  return cart;
}

// ---------------- 3 AI FEATURE SIMULATION ENGINES ----------------

/**
 * AI-1: Restock Priority AI
 */
function runRestockPriorityAI(forceError = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forceError) {
        return reject({
          code: 'AI_DATA_INSUFFICIENT',
          message: 'Không đủ dữ liệu hành vi mua sắm gần đây để xếp hạng ưu tiên bổ sung kệ.'
        });
      }

      const products = getProducts();
      const needsRestock = products.filter(p => p.stockQty < p.minQty);

      if (needsRestock.length === 0) {
        return resolve({
          status: 'empty',
          items: [],
          summary: 'Tất cả các kệ hiện đều ở mức an toàn. Không có cảnh báo cấp bách.'
        });
      }

      const scored = needsRestock.map(p => {
        const depletionRate = Math.max(0, 1 - (p.stockQty / (p.minQty || 1)));
        const velocityScore = Math.min(1, (p.salesVelocity || 20) / 60);
        const isEmptyBonus = p.stockQty === 0 ? 30 : 0;
        const totalScore = Math.min(99, Math.round((depletionRate * 45) + (velocityScore * 25) + isEmptyBonus));

        let urgency = 'Trung bình';
        if (totalScore >= 85) urgency = 'Rất Cao';
        else if (totalScore >= 70) urgency = 'Cao';

        const reason = p.stockQty === 0 
          ? `Kệ đã hết 100%, tốc độ bán ${p.salesVelocity} sp/ngày. Cần bổ sung ngay lập tức để không mất doanh thu.`
          : `Tồn kho chỉ còn ${p.stockQty}/${p.minQty} (dưới ngưỡng tối thiểu), dự kiến cạn trong 4-6 giờ tới.`;

        return {
          productId: p.id,
          productName: p.name,
          shelfId: p.shelfId,
          stockQty: p.stockQty,
          minQty: p.minQty,
          suggestedQty: Math.max(20, (p.maxQty || 80) - p.stockQty),
          score: totalScore,
          urgency: urgency,
          reason: reason
        };
      });

      scored.sort((a, b) => b.score - a.score);

      resolve({
        status: 'success',
        confidence: '96.4%',
        algorithm: 'Multi-factor Dynamic Depletion & Velocity Model (MDVM-v2)',
        items: scored
      });
    }, 700);
  });
}

/**
 * AI-2: Product Alternative AI
 */
function runProductAlternativeAI(productId, forceError = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forceError) {
        return reject({
          code: 'AI_NO_MATCH',
          message: 'Không tìm thấy sản phẩm tương đương phù hợp trong kho hàng.'
        });
      }

      const current = getProductById(productId);
      if (!current) {
        return reject({ code: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
      }

      const all = getProducts();
      const candidates = all.filter(p => p.id !== current.id && p.category === current.category && p.stockQty > 0);

      if (candidates.length === 0) {
        return resolve({
          status: 'empty',
          targetProduct: current,
          recommendations: [],
          message: 'Các sản phẩm cùng loại hiện cũng đang tạm hết hàng trên kệ.'
        });
      }

      const recommendations = candidates.map(c => {
        const priceDelta = Math.abs(c.price - current.price);
        const matchRate = Math.max(70, Math.min(98, 98 - Math.round((priceDelta / current.price) * 30)));
        let reason = '';
        if (priceDelta === 0) {
          reason = `Cùng loại ${c.category}, cùng mức giá ${c.price.toLocaleString()}đ, có sẵn ${c.stockQty} sản phẩm tại ${c.shelfId}.`;
        } else if (c.price < current.price) {
          reason = `Lựa chọn tiết kiệm hơn (${(current.price - c.price).toLocaleString()}đ rẻ hơn), chất lượng tương đương, vị trí ${c.shelfId}.`;
        } else {
          reason = `Dòng cao cấp cùng nhóm ${c.category}, độ phổ biến cao, sẵn ${c.stockQty} sản phẩm tại ${c.shelfId}.`;
        }

        return {
          product: c,
          matchRate: matchRate + '%',
          reason: reason,
          shelfCode: c.shelfId,
          shelfLevel: c.shelfLevel
        };
      });

      recommendations.sort((a, b) => parseInt(b.matchRate) - parseInt(a.matchRate));

      resolve({
        status: 'success',
        targetProduct: current,
        confidence: '94.8%',
        recommendations: recommendations.slice(0, 3)
      });
    }, 600);
  });
}

/**
 * AI-3: Shelf Anomaly Insight
 */
function runShelfAnomalyInsight(shelfId, forceError = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (forceError) {
        return reject({
          code: 'AI_SCAN_FAILED',
          message: 'Không thể kết nối module phân tích bất thường của kệ hàng.'
        });
      }

      const shelf = getShelfById(shelfId) || getShelves()[1];
      const checks = getShelfChecks().filter(c => c.shelfId === shelf.id || c.shelfCode === shelf.code);
      const latestCheck = checks[0] || { systemStock: 55, actualStock: 35, discrepancy: -20 };

      const diff = latestCheck.discrepancy;
      const diffPct = latestCheck.systemStock > 0 ? Math.round((Math.abs(diff) / latestCheck.systemStock) * 100) : 0;

      let anomalyLevel = 'Bình thường';
      let diagnosis = 'Kệ vận hành ổn định, sai số kiểm đếm nằm trong phạm vi tiêu chuẩn cho phép.';
      let actions = ['Tiếp tục theo dõi theo lịch kiểm tra định kỳ.'];

      if (diffPct > 20 || diff <= -15) {
        anomalyLevel = 'Nghiêm trọng (High Discrepancy)';
        diagnosis = `Phát hiện thất thoát đột biến ${Math.abs(diff)} sản phẩm (${diffPct}% tồn kho hệ thống) không qua quét mã POS.`;
        actions = [
          'Đối chiếu băng ghi hình camera giám sát tại lối đi khu vực trong 48h qua.',
          'Kiểm tra các kệ lân cận xem có bị xếp nhầm mã sản phẩm tương tự hay không.',
          'Khóa tạm số liệu tồn kho trên ứng dụng để tránh khách đặt trùng.'
        ];
      } else if (diffPct > 10) {
        anomalyLevel = 'Cảnh báo vừa (Moderate)';
        diagnosis = `Sai lệch ${Math.abs(diff)} sản phẩm có thể do khách đổi ý để lại sai kệ hàng.`;
        actions = [
          'Phân công nhân viên đi thu gom hàng để sai vị trí tại cuối ca.',
          'Cập nhật lại số liệu thực tế vào hệ thống.'
        ];
      }

      resolve({
        status: 'success',
        shelf: shelf,
        anomalyLevel: anomalyLevel,
        discrepancyCount: diff,
        discrepancyPercent: diffPct + '%',
        diagnosis: diagnosis,
        recommendedActions: actions,
        analyzedAt: new Date().toLocaleTimeString('vi-VN') + ' hôm nay'
      });
    }, 650);
  });
}

function getFallbackSeed() {
  return {
    zones: [
      { id: "Z01", code: "Khu vực A", name: "Khu vực A: Đồ Uống & Nước Giải Khát", floor: "Tầng 1", description: "Nước ngọt, nước khoáng, trà, cà phê đóng chai", totalShelves: 4 },
      { id: "Z02", code: "Khu vực B", name: "Khu vực B: Thực Phẩm Khô & Gia Vị", floor: "Tầng 1", description: "Mì ăn liền, gia vị, dầu ăn, gạo", totalShelves: 4 },
      { id: "Z03", code: "Khu vực C", name: "Khu vực C: Bánh Kẹo & Snack", floor: "Tầng 2", description: "Bánh quy, snack khoai tây, kẹo dẻo, socola", totalShelves: 3 },
      { id: "Z04", code: "Khu vực D", name: "Khu vực D: Hóa Mỹ Phẩm & Tẩy Rửa", floor: "Tầng 2", description: "Dầu gội, sữa tắm, nước giặt, nước xả vải", totalShelves: 3 }
    ],
    shelves: [
      { id: "SH-A01", code: "Kệ A01", zoneId: "Z01", zoneCode: "Khu vực A", levelCount: 4, maxCapacity: 120, currentCount: 85, status: "normal", lastChecked: "2026-10-19 14:30" },
      { id: "SH-A02", code: "Kệ A02", zoneId: "Z01", zoneCode: "Khu vực A", levelCount: 4, maxCapacity: 120, currentCount: 18, status: "low", lastChecked: "2026-10-20 07:15" },
      { id: "SH-A03", code: "Kệ A03", zoneId: "Z01", zoneCode: "Khu vực A", levelCount: 4, maxCapacity: 100, currentCount: 2, status: "empty", lastChecked: "2026-10-20 06:45" },
      { id: "SH-A04", code: "Kệ A04", zoneId: "Z01", zoneCode: "Khu vực A", levelCount: 3, maxCapacity: 90, currentCount: 75, status: "normal", lastChecked: "2026-10-18 16:00" },
      { id: "SH-B01", code: "Kệ B01", zoneId: "Z02", zoneCode: "Khu vực B", levelCount: 4, maxCapacity: 150, currentCount: 120, status: "normal", lastChecked: "2026-10-19 10:20" },
      { id: "SH-B02", code: "Kệ B02", zoneId: "Z02", zoneCode: "Khu vực B", levelCount: 4, maxCapacity: 140, currentCount: 35, status: "anomaly", lastChecked: "2026-10-20 07:00" },
      { id: "SH-B03", code: "Kệ B03", zoneId: "Z02", zoneCode: "Khu vực B", levelCount: 3, maxCapacity: 90, currentCount: 12, status: "low", lastChecked: "2026-10-19 17:00" },
      { id: "SH-B04", code: "Kệ B04", zoneId: "Z02", zoneCode: "Khu vực B", levelCount: 3, maxCapacity: 90, currentCount: 80, status: "normal", lastChecked: "2026-10-18 11:30" },
      { id: "SH-C01", code: "Kệ C01", zoneId: "Z03", zoneCode: "Khu vực C", levelCount: 4, maxCapacity: 100, currentCount: 90, status: "normal", lastChecked: "2026-10-19 15:40" },
      { id: "SH-C02", code: "Kệ C02", zoneId: "Z03", zoneCode: "Khu vực C", levelCount: 4, maxCapacity: 110, currentCount: 15, status: "low", lastChecked: "2026-10-20 07:10" },
      { id: "SH-C03", code: "Kệ C03", zoneId: "Z03", zoneCode: "Khu vực C", levelCount: 3, maxCapacity: 80, currentCount: 0, status: "empty", lastChecked: "2026-10-20 06:30" },
      { id: "SH-D01", code: "Kệ D01", zoneId: "Z04", zoneCode: "Khu vực D", levelCount: 4, maxCapacity: 100, currentCount: 65, status: "normal", lastChecked: "2026-10-19 09:15" },
      { id: "SH-D02", code: "Kệ D02", zoneId: "Z04", zoneCode: "Khu vực D", levelCount: 3, maxCapacity: 75, currentCount: 10, status: "low", lastChecked: "2026-10-20 07:25" },
      { id: "SH-D03", code: "Kệ D03", zoneId: "Z04", zoneCode: "Khu vực D", levelCount: 3, maxCapacity: 80, currentCount: 78, status: "normal", lastChecked: "2026-10-18 14:00" }
    ],
    products: [
      { id: "PROD-001", sku: "DK-COCA-320", name: "Nước ngọt Coca-Cola Sleek Lon 320ml", category: "Đồ Uống", price: 10500, shelfId: "Kệ A02", shelfLevel: "Tầng 2", zoneCode: "Khu vực A", stockQty: 8, minQty: 30, maxQty: 100, status: "low", salesVelocity: 45, description: "Nước giải khát có ga hương cola tươi mát sảng khoái truyền thống." },
      { id: "PROD-002", sku: "DK-PEPSI-320", name: "Nước ngọt Pepsi Sleek Lon 320ml", category: "Đồ Uống", price: 10000, shelfId: "Kệ A02", shelfLevel: "Tầng 2", zoneCode: "Khu vực A", stockQty: 10, minQty: 25, maxQty: 80, status: "low", salesVelocity: 38, description: "Hương vị cola sảng khoái với công thức độc quyền từ PepsiCo." },
      { id: "PROD-003", sku: "DK-LAVI-500", name: "Nước khoáng thiên nhiên La Vie Chai 500ml", category: "Đồ Uống", price: 6000, shelfId: "Kệ A01", shelfLevel: "Tầng 1", zoneCode: "Khu vực A", stockQty: 55, minQty: 30, maxQty: 120, status: "normal", salesVelocity: 50, description: "Nước khoáng thiên nhiên chứa 6 loại khoáng chất thiết yếu cho cơ thể." },
      { id: "PROD-004", sku: "DK-COCA-ZERO", name: "Nước ngọt Coca-Cola Không Đường 320ml", category: "Đồ Uống", price: 11000, shelfId: "Kệ A03", shelfLevel: "Tầng 3", zoneCode: "Khu vực A", stockQty: 0, minQty: 20, maxQty: 80, status: "empty", salesVelocity: 32, description: "Vị cola trọn vẹn, không calo, thích hợp cho người ăn kiêng." },
      { id: "PROD-005", sku: "DK-PEPSI-ZERO", name: "Nước ngọt Pepsi Không Calo Sleek 320ml", category: "Đồ Uống", price: 10500, shelfId: "Kệ A01", shelfLevel: "Tầng 3", zoneCode: "Khu vực A", stockQty: 30, minQty: 15, maxQty: 60, status: "normal", salesVelocity: 28, description: "Pepsi vị chanh không calo, cảm giác mát lạnh tức thì." },
      { id: "PROD-007", sku: "FD-HAOHAO-TCH", name: "Mì ăn liền Hảo Hảo Tôm Chua Cay Gói 75g", category: "Thực Phẩm", price: 4500, shelfId: "Kệ B01", shelfLevel: "Tầng 2", zoneCode: "Khu vực B", stockQty: 90, minQty: 40, maxQty: 200, status: "normal", salesVelocity: 85, description: "Mì tôm chua cay đậm đà." },
      { id: "PROD-009", sku: "FD-OMACHI-XB", name: "Mì khoai tây Omachi Sốt Bò Hầm Gói 80g", category: "Thực Phẩm", price: 8500, shelfId: "Kệ B02", shelfLevel: "Tầng 2", zoneCode: "Khu vực B", stockQty: 6, minQty: 30, maxQty: 100, status: "low", salesVelocity: 52, description: "Mì khoai tây sốt bò hầm cao cấp." },
      { id: "PROD-011", sku: "SN-LAYS-CLASSIC", name: "Snack Khoai Tây Lay's Cổ Điển Tự Nhiên Gói 95g", category: "Snack", price: 22000, shelfId: "Kệ C03", shelfLevel: "Tầng 2", zoneCode: "Khu vực C", stockQty: 0, minQty: 15, maxQty: 60, status: "empty", salesVelocity: 35, description: "Snack khoai tây lát mỏng giòn tan." },
      { id: "PROD-012", sku: "SN-OSTAR-BBQ", name: "Snack Khoai Tây O'Star Vị Bò Bít Tết Gói 90g", category: "Snack", price: 20000, shelfId: "Kệ C01", shelfLevel: "Tầng 2", zoneCode: "Khu vực C", stockQty: 38, minQty: 15, maxQty: 50, status: "normal", salesVelocity: 26, description: "Snack khoai tây vị bò BBQ nướng." },
      { id: "PROD-014", sku: "CH-CLEAR-MEN", name: "Dầu gội sạch gàu Clear Men Cool Sport Bạc Hà 630g", category: "Hóa Mỹ Phẩm", price: 175000, shelfId: "Kệ D02", shelfLevel: "Tầng 2", zoneCode: "Khu vực D", stockQty: 10, minQty: 15, maxQty: 40, status: "low", salesVelocity: 12, description: "Dầu gội sạch gàu sảng khoái bạc hà." }
    ],
    restockTasks: [
      { id: "TASK-101", shelfId: "SH-A03", shelfCode: "Kệ A03", productId: "PROD-004", productName: "Coca-Cola Không Đường 320ml", requestedQty: 40, priority: "Cao", aiPriorityScore: 98, aiReason: "Kệ đã trống 100%, tốc độ bán 32 sp/ngày.", status: "pending", assignedTo: "Nguyễn Quang Long", createdAt: "2026-10-20 06:50" },
      { id: "TASK-102", shelfId: "SH-C03", shelfCode: "Kệ C03", productId: "PROD-011", productName: "Snack Khoai Tây Lay's Cổ Điển 95g", requestedQty: 30, priority: "Cao", aiPriorityScore: 92, aiReason: "Hết hàng hoàn toàn tại kệ mặt tiền Tầng 2.", status: "in-progress", assignedTo: "Nguyễn Quang Long", createdAt: "2026-10-20 07:05" },
      { id: "TASK-103", shelfId: "SH-A02", shelfCode: "Kệ A02", productId: "PROD-001", productName: "Coca-Cola Sleek Lon 320ml", requestedQty: 50, priority: "Cao", aiPriorityScore: 88, aiReason: "Còn 8 lon, dưới ngưỡng 30.", status: "pending", assignedTo: "Nguyễn Quang Long", createdAt: "2026-10-20 07:20" },
      { id: "TASK-104", shelfId: "SH-B02", shelfCode: "Kệ B02", productId: "PROD-009", productName: "Mì khoai tây Omachi Sốt Bò Hầm", requestedQty: 40, priority: "Trung bình", aiPriorityScore: 76, aiReason: "Sai lệch tồn kho giữa hệ thống và thực tế.", status: "review", assignedTo: "Trần Trọng Hoàng Anh", createdAt: "2026-10-20 07:15" },
      { id: "TASK-105", shelfId: "SH-D02", shelfCode: "Kệ D02", productId: "PROD-014", productName: "Clear Men Cool Sport Bạc Hà 630g", requestedQty: 20, priority: "Thấp", aiPriorityScore: 54, aiReason: "Còn 10 chai, tốc độ luân chuyển vừa phải.", status: "completed", assignedTo: "Nguyễn Văn Hân", createdAt: "2026-10-19 16:30" }
    ],
    shelfChecks: [
      { id: "CHK-001", shelfId: "SH-B02", shelfCode: "Kệ B02", zoneCode: "Khu vực B", checkerName: "Nguyễn Quang Long", checkedAt: "2026-10-20 07:00", systemStock: 55, actualStock: 35, discrepancy: -20, status: "anomaly", note: "Nghi ngờ thất thoát hoặc để nhầm kệ." },
      { id: "CHK-002", shelfId: "SH-A02", shelfCode: "Kệ A02", zoneCode: "Khu vực A", checkerName: "Nguyễn Quang Long", checkedAt: "2026-10-20 07:15", systemStock: 20, actualStock: 18, discrepancy: -2, status: "normal", note: "Khách cầm xem để tạm sang tầng trên." },
      { id: "CHK-003", shelfId: "SH-C03", shelfCode: "Kệ C03", zoneCode: "Khu vực C", checkerName: "Nguyễn Văn Hân", checkedAt: "2026-10-20 06:30", systemStock: 0, actualStock: 0, discrepancy: 0, status: "empty", note: "Kệ trống đúng số liệu hệ thống." }
    ],
    users: [
      { id: "USR-001", username: "hoanganh", fullName: "Trần Trọng Hoàng Anh", role: "customer", email: "hoanganh.cse@tlu.edu.vn", badge: "Nhóm trưởng (SV1)" },
      { id: "USR-002", username: "quanglong", fullName: "Nguyễn Quang Long", role: "staff", email: "quanglong.cse@tlu.edu.vn", badge: "Nhân viên Kệ Hàng (SV2)" },
      { id: "USR-003", username: "vanhan", fullName: "Nguyễn Văn Hân", role: "manager", email: "vanhan.cse@tlu.edu.vn", badge: "Quản lý Cửa Hàng (SV3)" },
      { id: "USR-004", username: "admin", fullName: "Quản Trị Viên", role: "admin", email: "admin@smartshelf.vn", badge: "Quản trị viên" }
    ]
  };
}

initDatabase();
