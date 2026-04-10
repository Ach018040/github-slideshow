# AlphaFold 研究 App PRD v1

## 1) 產品定位

- **產品名稱（暫定）**：AlphaFold Workflow OS
- **產品目標**：把 AlphaFold Server（或未來自管 AF3 inference）當作預測引擎，建立一個可重現、可比較、可知識化的研究工作流平台。
- **非目標**：不重做 AlphaFold 模型本體；不以繞過官方網站限制為目標；不作臨床診斷用途。

## 2) 目標使用者與核心情境

### 2.1 目標使用者

1. 植物與農業生物研究者
2. 結構生物學 / 蛋白工程研究者
3. 具少量生資背景但需要可操作流程的濕實驗團隊

### 2.2 核心情境（Jobs-to-be-done）

1. 快速建立 WT / mutant 的可比較預測任務
2. 比較蛋白質與 DNA/RNA/ligand 的互作差異
3. 系統化管理任務輸入、版本與結果
4. 以 confidence 與 ranking 資訊產生可驗證實驗假說

## 3) 問題陳述

目前研究者在使用 AlphaFold 時常見痛點：

- 任務輸入不一致（命名、序列品質、分子角色）
- 單次預測結果難以跨批次比較
- 結果常停留在看 3D 圖，缺少結構化分析
- 預測輸出與文獻、功能註解、實驗設計脫節

## 4) 產品原則

1. **問題導向**：先定義研究問題，再建立預測任務。
2. **可重現**：輸入參數、版本、執行紀錄可追蹤。
3. **可比較**：支援 WT vs mutant、多條件批次比較。
4. **可解釋**：把 confidence / ranking / 介面資訊轉成可讀摘要。
5. **可擴充**：引擎與工作流分層，先接服務、後接自管推論。

## 5) 系統分層（核心架構）

### 5.1 Input Design Layer

**目的**：建立標準化序列與分子條件。

功能：
- 序列匯入（FASTA / 手動貼上）
- 序列檢查（非法字元、長度、重複命名）
- 分子角色定義（protein / DNA / RNA / ligand / ion / modified residue）
- 任務模板（抗病蛋白互作、TF-DNA、enzyme-ligand）
- WT / mutant 任務一鍵分支

### 5.2 Job Orchestration Layer

**目的**：管理 jobs、版本、命名與狀態。

功能：
- 以 JSON 產生任務定義
- job 命名規範與 batch tag
- 狀態追蹤（draft / queued / running / done / failed）
- 任務版本化（輸入變更歷史）
- 批次重跑與失敗重試

### 5.3 Result Intelligence Layer

**目的**：統整 confidence、ranking、structure outputs。

功能：
- 解析 `.cif`、confidence JSON、summary JSON、ranking CSV
- 自動擷取 top model
- WT vs mutant ranking 與 confidence 差異比較
- 介面殘基標記與變化摘要
- 匯出報表（CSV / Markdown / PDF）

### 5.4 Knowledge Layer

**目的**：將結果與研究假說、筆記、文獻、實驗設計相連。

功能：
- 每個 job 綁定研究假說與註解
- 連結基因功能、物種背景與文獻
- 建立「預測 → 假說 → 實驗設計 → 結果」追蹤鏈
- 可搜尋歷史案例並重用模板

## 6) MVP 範圍與版本規劃

### 6.1 V1（研究者工作台）

- 專案管理
- 序列管理
- 建立 job（含模板、命名、批次）
- 結果歸檔（CIF/JSON/CSV）
- 3D viewer 與基本摘要頁

**成功指標**：
- 研究者可在 30 分鐘內完成一個完整案例（建立 → 執行 → 檢視 → 匯出）

### 6.2 V2（分析自動化）

- WT vs mutant 自動比較
- confidence heatmap
- 介面殘基偵測
- 自動產生實驗假說摘要

**成功指標**：
- 比對報告產生時間 < 2 分鐘
- 使用者手動整理時間下降 50%

### 6.3 V3（團隊協作）

- 專案共享
- 審閱流程與註解
- 可追蹤報告版本

**成功指標**：
- 團隊跨人員重現同一案例結果的一致率 > 95%

## 7) 功能需求（Functional Requirements）

1. 系統必須支援建立多分子任務（protein/DNA/RNA/ligand）。
2. 系統必須保存每次 job 的完整輸入 JSON 與版本資訊。
3. 系統必須保存並索引主要輸出檔（CIF、confidence JSON、ranking CSV）。
4. 系統必須提供跨任務比較（至少支援 WT vs mutant）。
5. 系統必須產生可下載研究摘要（至少 CSV 與 Markdown）。
6. 系統必須提供任務狀態與錯誤原因可視化。

## 8) 非功能需求（Non-functional Requirements）

- **可靠性**：任務 metadata 不可遺失；支援失敗重試。
- **可維護性**：引擎對接模組與分析模組解耦。
- **可擴充性**：可平滑接入自管 AF3 inference worker。
- **可追溯性**：所有關鍵操作有 audit log。
- **合規性**：研究用途聲明、禁止用途提醒、資料權責邊界清楚。

## 9) 資料模型（初版）

### 9.1 主要資料表

- `projects`
- `sequences`
- `molecules`
- `jobs`
- `job_inputs`
- `job_outputs`
- `confidence_metrics`
- `rankings`
- `hypotheses`
- `notes`
- `references`

### 9.2 關聯概念

- 一個 `project` 有多個 `jobs`
- 一個 `job` 對應一版 `job_input` 與多個 `job_output`
- `confidence_metrics` 與 `rankings` 由 output 解析後生成
- `hypotheses` 與 `notes` 連到 job 與 project

## 10) 頁面資訊架構（IA）

1. **Dashboard**：最近任務、失敗任務、比較報告入口
2. **Project Page**：案例概覽、序列清單、job 清單
3. **Job Builder**：輸入設計、模板套用、JSON 預覽
4. **Job Detail**：狀態、輸出檔、3D viewer、confidence 摘要
5. **Comparison**：WT vs mutant 差異圖與表
6. **Knowledge**：假說、文獻、註解、後續實驗設計

## 11) 技術架構建議

- **前端**：Next.js（專案頁、序列編輯器、3D viewer）
- **後端**：Python + FastAPI（job parser、結果抽取、報表生成）
- **資料庫**：Postgres / Supabase
- **物件儲存**：S3 相容儲存（CIF/JSON/CSV）
- **背景任務**：Celery / queue system
- **未來擴充**：GPU worker（自管 inference）

## 12) 風險與對策

1. **政策風險**：第三方服務使用條款變動
   - 對策：引擎抽象層 + 自管方案預留
2. **資料品質風險**：序列命名與格式不一致
   - 對策：輸入檢查與模板化命名規則
3. **解讀風險**：使用者把預測誤當實驗結論
   - 對策：結果頁加入 confidence 解讀與研究用途聲明
4. **運算成本風險**：自管推論成本高
   - 對策：先做 workflow/data layer，推論層後置

## 13) MVP 開發順序（12 週範例）

- **第 1–2 週**：資料模型、專案/序列 CRUD
- **第 3–4 週**：Job Builder + JSON 產生與版本化
- **第 5–6 週**：輸出檔上傳、解析器、索引
- **第 7–8 週**：Job Detail + 3D viewer + 摘要
- **第 9–10 週**：WT/mutant 比較頁
- **第 11–12 週**：報表匯出、QA、文件化與試點使用

## 14) 驗收標準（Acceptance Criteria）

1. 可建立並追蹤至少 50 個 jobs，不發生 metadata 遺失。
2. 任一 job 可完整還原輸入條件與結果輸出。
3. WT vs mutant 比較報告可一鍵生成且可匯出。
4. 使用者可在單一頁面完成「看結構 + 看 confidence + 看摘要」。
5. 研究筆記可回連到 job 與輸出檔案。

## 15) 後續擴充（Post-MVP）

- Domain-specific 模板（植物病理、微生物、酵素工程、藥物探索）
- 文獻自動摘要與功能註解整合
- API / CLI 介面供內部 pipeline 串接
- 團隊權限與審閱流程（GxP-like audit trail）

---

## 附錄：一頁式定位結論

- 把 AlphaFold 當作**高價值預測引擎**。
- 產品差異化放在**輸入設計、流程管理、結果智慧化、知識整合**。
- 先做 workflow/data 層，再決定是否接入自管推論。
