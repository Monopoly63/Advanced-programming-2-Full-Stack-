# إجابات أسئلة المناقشة (Task 3 Discussion Answers)

## 1. لماذا نستخدم `concat` بدلًا من `push` عند تحديث مصفوفة في الحالة؟

نستخدم `concat` لأنه يُرجع **مصفوفة جديدة** دون تعديل المصفوفة الأصلية
(immutable). في React يجب أن يكون تحديث الحالة غير مباشر لضمان إعادة
التصيير (re-render) بشكل صحيح. أما `push` فيعدّل المصفوفة الأصلية مباشرة
(mutable)، مما قد يمنع React من اكتشاف التغيير لأن مرجع (reference)
المصفوفة لم يتغير.

```js
// ✅ صحيح
setItems(items.concat(newItem));
setItems([...items, newItem]);

// ❌ خاطئ
items.push(newItem);
setItems(items);
```

---

## 2. لماذا نحتاج `[...votes]` عند التصويت بدلًا من تعديل المصفوفة مباشرة؟

نستخدم `[...votes]` لإنشاء **نسخة جديدة** من المصفوفة باستخدام spread
operator، ثم نعدّل النسخة بدلاً من الأصل. هذا يحافظ على مبدأ
**عدم التغيير المباشر (immutability)**، ويساعد React على اكتشاف
التغييرات عبر مقارنة المراجع (reference comparison).

```jsx
const handleVote = () => {
  const newVotes = [...votes]; // نسخة جديدة
  newVotes[selected] += 1;
  setVotes(newVotes);
};
```

---

## 3. ما الفرق بين `onClick={handleClick}` و `onClick={handleClick()}`؟

- `onClick={handleClick}` → **تمرير** الدالة. React ستنفذها عند الضغط.
- `onClick={handleClick()}` → **تنفيذ** الدالة أثناء الـ render، ثم تمرير
  القيمة المُرجعة كـ handler (غالبًا خطأ).

```jsx
// ✅ صحيح
<button onClick={handleClick}>Click</button>

// ✅ عند الحاجة لتمرير معامل
<button onClick={() => handleClick(id)}>Click</button>

// ❌ ينفذ مباشرة عند الـ render
<button onClick={handleClick()}>Click</button>
```

---

## 4. متى نستخدم حالة واحدة معقدة (كائن) ومتى نستخدم عدة حالات منفصلة؟

- **حالة واحدة ككائن**: عندما تكون الحقول مترابطة منطقيًا (مثل بيانات
  نموذج: `{ name, email, password }`)، وتتغير معًا.
- **عدة حالات منفصلة**: عندما تكون القيم مستقلة وتتغير في أوقات مختلفة
  (مثل عدادات Good/Neutral/Bad)، مما يجعل الكود أوضح ويحسّن الأداء.

---

## الحد الأدنى المطلوب (Minimum Goals)

- فهم مبدأ **immutability** في React.
- التمييز بين `push` و `concat` / spread operator.
- إتقان استخدام `...` في المصفوفات والكائنات.
- التمييز بين تمرير الدالة وتنفيذها في أحداث JSX.
- اختيار بنية الحالة (state structure) المناسبة.