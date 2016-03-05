package feuyeux.datastructure.heap;

import java.util.AbstractQueue;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.ConcurrentModificationException;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.Queue;
import java.util.SortedSet;

public class AirPriorityQueue<E> extends AbstractQueue<E> implements java.io.Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 7228745135806110533L;
    private static final int DEFAULT_INITIAL_CAPACITY = 11;
    /**
     * The maximum size of array to allocate.
     * Some VMs reserve some header words in an array.
     * Attempts to allocate larger arrays may result in
     * OutOfMemoryError: Requested array size exceeds VM limit
     */
    private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;
    /**
     * The comparator, or null if priority queue uses elements'
     * natural ordering.
     */
    private final Comparator<? super E> comparator;
    /**
     * Priority queue represented as a balanced binary heap: the two
     * children of queue[n] are queue[2*n+1] and queue[2*(n+1)].  The
     * priority queue is ordered by comparator, or by the elements'
     * natural ordering, if comparator is null: For each node n in the
     * heap and each descendant d of n, n <= d.  The element with the
     * lowest value is in queue[0], assuming the queue is nonempty.
     */
    private transient Object[] queue;
    /**
     * The number of elements in the priority queue.
     */
    private int size = 0;
    /**
     * The number of times this priority queue has been
     * <i>structurally modified</i>.  See AbstractList for gory details.
     */
    private transient int modCount = 0;

    /**
     * Creates a {@code AirPriorityQueue} with the default initial
     * capacity (11) that orders its elements according to their
     * {@linkplain Comparable natural ordering}.
     */
    public AirPriorityQueue() {
        this(AirPriorityQueue.DEFAULT_INITIAL_CAPACITY, null);
    }

    /**
     * Creates a {@code AirPriorityQueue} with the specified initial
     * capacity that orders its elements according to their
     * {@linkplain Comparable natural ordering}.
     *
     * @param initialCapacity the initial capacity for this priority queue
     * @throws IllegalArgumentException if {@code initialCapacity} is less
     *                                  than 1
     */
    public AirPriorityQueue(final int initialCapacity) {
        this(initialCapacity, null);
    }

    /**
     * Creates a {@code AirPriorityQueue} with the specified initial capacity
     * that orders its elements according to the specified comparator.
     *
     * @param initialCapacity the initial capacity for this priority queue
     * @param comparator      the comparator that will be used to order this
     *                        priority queue.  If {@code null}, the {@linkplain Comparable
     *                        natural ordering} of the elements will be used.
     * @throws IllegalArgumentException if {@code initialCapacity} is
     *                                  less than 1
     */
    public AirPriorityQueue(final int initialCapacity, final Comparator<? super E> comparator) {
        // Note: This restriction of at least one is not actually needed,
        // but continues for 1.5 compatibility
        if (initialCapacity < 1) {
            throw new IllegalArgumentException();
        }
        this.queue = new Object[initialCapacity];
        this.comparator = comparator;
    }

    /**
     * Creates a {@code AirPriorityQueue} containing the elements in the
     * specified collection.  If the specified collection is an instance of
     * a {@link java.util.SortedSet} or is another {@code AirPriorityQueue}, this
     * priority queue will be ordered according to the same ordering.
     * Otherwise, this priority queue will be ordered according to the
     * {@linkplain Comparable natural ordering} of its elements.
     *
     * @param c the collection whose elements are to be placed
     *          into this priority queue
     * @throws ClassCastException   if elements of the specified collection
     *                              cannot be compared to one another according to the priority
     *                              queue's ordering
     * @throws NullPointerException if the specified collection or any
     *                              of its elements are null
     */
    @SuppressWarnings("unchecked")
    public AirPriorityQueue(final Collection<? extends E> c) {
        if (c instanceof SortedSet<?>) {
            final SortedSet<? extends E> ss = (SortedSet<? extends E>) c;
            this.comparator = (Comparator<? super E>) ss.comparator();
            initElementsFromCollection(ss);
        } else if (c instanceof AirPriorityQueue<?>) {
            final AirPriorityQueue<? extends E> pq = (AirPriorityQueue<? extends E>) c;
            this.comparator = (Comparator<? super E>) pq.comparator();
            initFromPriorityQueue(pq);
        } else {
            this.comparator = null;
            initFromCollection(c);
        }
    }

    /**
     * Creates a {@code AirPriorityQueue} containing the elements in the
     * specified priority queue.  This priority queue will be
     * ordered according to the same ordering as the given priority
     * queue.
     *
     * @param c the priority queue whose elements are to be placed
     *          into this priority queue
     * @throws ClassCastException   if elements of {@code c} cannot be
     *                              compared to one another according to {@code c}'s
     *                              ordering
     * @throws NullPointerException if the specified priority queue or any
     *                              of its elements are null
     */
    @SuppressWarnings("unchecked")
    public AirPriorityQueue(final AirPriorityQueue<? extends E> c) {
        this.comparator = (Comparator<? super E>) c.comparator();
        initFromPriorityQueue(c);
    }

    /**
     * Creates a {@code AirPriorityQueue} containing the elements in the
     * specified sorted set.   This priority queue will be ordered
     * according to the same ordering as the given sorted set.
     *
     * @param c the sorted set whose elements are to be placed
     *          into this priority queue
     * @throws ClassCastException   if elements of the specified sorted
     *                              set cannot be compared to one another according to the
     *                              sorted set's ordering
     * @throws NullPointerException if the specified sorted set or any
     *                              of its elements are null
     */
    @SuppressWarnings("unchecked")
    public AirPriorityQueue(final SortedSet<? extends E> c) {
        this.comparator = (Comparator<? super E>) c.comparator();
        initElementsFromCollection(c);
    }

    private static int hugeCapacity(final int minCapacity) {
        if (minCapacity < 0) {
            throw new OutOfMemoryError();
        }
        return minCapacity > AirPriorityQueue.MAX_ARRAY_SIZE ? Integer.MAX_VALUE : AirPriorityQueue.MAX_ARRAY_SIZE;
    }

    private void initFromPriorityQueue(final AirPriorityQueue<? extends E> c) {
        if (c.getClass() == AirPriorityQueue.class) {
            this.queue = c.toArray();
            this.size = c.size();
        } else {
            initFromCollection(c);
        }
    }

    private void initElementsFromCollection(final Collection<? extends E> c) {
        Object[] a = c.toArray();
        // If c.toArray incorrectly doesn't return Object[], copy it.
        if (a.getClass() != Object[].class) {
            a = Arrays.copyOf(a, a.length, Object[].class);
        }
        final int len = a.length;
        if (len == 1 || this.comparator != null) {
            for (int i = 0; i < len; i++) {
                if (a[i] == null) {
                    throw new NullPointerException();
                }
            }
        }
        this.queue = a;
        this.size = a.length;
    }

    /**
     * Initializes queue array with elements from the given Collection.
     *
     * @param c the collection
     */
    private void initFromCollection(final Collection<? extends E> c) {
        initElementsFromCollection(c);
        heapify();
    }

    private void siftUpComparable(int k, final E x) {
        final Comparable<? super E> key = (Comparable<? super E>) x;
        while (k > 0) {
            final int parent = k - 1 >>> 1;
            final Object e = queue[parent];
            if (key.compareTo((E) e) >= 0) {
                break;
            }
            queue[k] = e;
            System.out.printf("queue[k]=e :%s e:%s parent:%s%n", sout(queue), e, parent);
            k = parent;
        }
        queue[k] = key;
        System.out.printf("queue[k]=key :%s k:%s,key:%s%n", sout(queue), k, key);
    }

    private void siftDownComparable(int k, final E x) {
        final Comparable<? super E> key = (Comparable<? super E>) x;
        final int half = size >>> 1; // loop while a non-leaf
        System.out.printf("half=size>>>1 :%s,size:%s%n", half, size);
        while (k < half) {
            int child = (k << 1) + 1; // assume left child is least
            Object c = queue[child];
            final int right = child + 1;
            if (right < size && ((Comparable<? super E>) c).compareTo((E) queue[right]) > 0) {
                c = queue[child = right];
            }
            if (key.compareTo((E) c) <= 0) {
                break;
            }
            queue[k] = c;
            System.out.printf("queue[k]=c :%s c:%s child:%s%n", sout(queue), c, child);
            k = child;
        }
        queue[k] = key;
        System.out.printf("queue[k]=key :%s k:%s,key:%s%n", sout(queue), k, key);
    }

    /**
     * Increases the capacity of the array.
     *
     * @param minCapacity the desired minimum capacity
     */
    private void grow(final int minCapacity) {
        final int oldCapacity = queue.length;
        // Double size if small; else grow by 50%
        int newCapacity = oldCapacity + (oldCapacity < 64 ? oldCapacity + 2 : oldCapacity >> 1);
        // overflow-conscious code
        if (newCapacity - AirPriorityQueue.MAX_ARRAY_SIZE > 0) {
            newCapacity = hugeCapacity(minCapacity);
        }
        queue = Arrays.copyOf(queue, newCapacity);
    }

    /**
     * Inserts the specified element into this priority queue.
     *
     * @return {@code true} (as specified by {@link Queue#offer})
     * @throws ClassCastException   if the specified element cannot be
     *                              compared with elements currently in this priority queue
     *                              according to the priority queue's ordering
     * @throws NullPointerException if the specified element is null
     */
    @Override
    public boolean offer(final E e) {
        System.out.println("\n+::");
        if (e == null) {
            throw new NullPointerException();
        }
        modCount++;
        final int i = size;
        if (i >= queue.length) {
            grow(i + 1);
        }
        size = i + 1;
        if (i == 0) {
            queue[0] = e;
        } else {
            siftUp(i, e);
        }
        System.out.println("::+");
        return true;
    }

    @Override
    public E peek() {
        if (size == 0) {
            return null;
        }
        return (E) queue[0];
    }

    private int indexOf(final Object o) {
        if (o != null) {
            for (int i = 0; i < size; i++) {
                if (o.equals(queue[i])) {
                    return i;
                }
            }
        }
        return -1;
    }

    /**
     * Removes a single instance of the specified element from this queue,
     * if it is present.  More formally, removes an element {@code e} such
     * that {@code o.equals(e)}, if this queue contains one or more such
     * elements.  Returns {@code true} if and only if this queue contained
     * the specified element (or equivalently, if this queue changed as a
     * result of the call).
     *
     * @param o element to be removed from this queue, if present
     * @return {@code true} if this queue changed as a result of the call
     */
    @Override
    public boolean remove(final Object o) {
        final int i = indexOf(o);
        if (i == -1) {
            return false;
        } else {
            removeAt(i);
            return true;
        }
    }

    /**
     * Version of remove using reference equality, not equals.
     * Needed by iterator.remove.
     *
     * @param o element to be removed from this queue, if present
     * @return {@code true} if removed
     */
    boolean removeEq(final Object o) {
        for (int i = 0; i < size; i++) {
            if (o == queue[i]) {
                removeAt(i);
                return true;
            }
        }
        return false;
    }

    /**
     * Returns an array containing all of the elements in this queue.
     * The elements are in no particular order.
     * <p/>
     * <p>The returned array will be "safe" in that no references to it are
     * maintained by this queue.  (In other words, this method must allocate
     * a new array).  The caller is thus free to modify the returned array.
     * <p/>
     * <p>This method acts as bridge between array-based and collection-based
     * APIs.
     *
     * @return an array containing all of the elements in this queue
     */
    @Override
    public Object[] toArray() {
        return Arrays.copyOf(queue, size);
    }

    /**
     * Returns an array containing all of the elements in this queue; the
     * runtime type of the returned array is that of the specified array.
     * The returned array elements are in no particular order.
     * If the queue fits in the specified array, it is returned therein.
     * Otherwise, a new array is allocated with the runtime type of the
     * specified array and the size of this queue.
     * <p/>
     * <p>If the queue fits in the specified array with room to spare
     * (i.e., the array has more elements than the queue), the element in
     * the array immediately following the end of the collection is set to
     * {@code null}.
     * <p/>
     * <p>Like the {@link #toArray()} method, this method acts as bridge between
     * array-based and collection-based APIs.  Further, this method allows
     * precise control over the runtime type of the output array, and may,
     * under certain circumstances, be used to save allocation costs.
     * <p/>
     * <p>Suppose <tt>x</tt> is a queue known to contain only strings.
     * The following code can be used to dump the queue into a newly
     * allocated array of <tt>String</tt>:
     * <p/>
     * <pre>
     *     String[] y = x.toArray(new String[0]);</pre>
     *
     * Note that <tt>toArray(new Object[0])</tt> is identical in function to
     * <tt>toArray()</tt>.
     *
     * @param a the array into which the elements of the queue are to
     *          be stored, if it is big enough; otherwise, a new array of the
     *          same runtime type is allocated for this purpose.
     * @return an array containing all of the elements in this queue
     * @throws ArrayStoreException  if the runtime type of the specified array
     *                              is not a supertype of the runtime type of every element in
     *                              this queue
     * @throws NullPointerException if the specified array is null
     */
    @Override
    public <T> T[] toArray(final T[] a) {
        if (a.length < size) {
            // Make a new array of a's runtime type, but my contents:
            return (T[]) Arrays.copyOf(queue, size, a.getClass());
        }
        System.arraycopy(queue, 0, a, 0, size);
        if (a.length > size) {
            a[size] = null;
        }
        return a;
    }

    /**
     * Returns an iterator over the elements in this queue. The iterator
     * does not return the elements in any particular order.
     *
     * @return an iterator over the elements in this queue
     */
    @Override
    public Iterator<E> iterator() {
        return new Itr();
    }

    @Override
    public int size() {
        return size;
    }

    /**
     * Removes all of the elements from this priority queue.
     * The queue will be empty after this call returns.
     */
    @Override
    public void clear() {
        modCount++;
        for (int i = 0; i < size; i++) {
            queue[i] = null;
        }
        size = 0;
    }

    @Override
    public E poll() {
        System.out.println("\n-::");
        if (size == 0) {
            return null;
        }
        final int s = --size;
        modCount++;
        final E result = (E) queue[0];
        final E x = (E) queue[s];
        queue[s] = null;
        if (s != 0) {
            siftDown(0, x);
        }
        System.out.println("::-");
        return result;
    }

    /**
     * Removes the ith element from queue.
     * <p/>
     * Normally this method leaves the elements at up to i-1,
     * inclusive, untouched.  Under these circumstances, it returns
     * null.  Occasionally, in order to maintain the heap invariant,
     * it must swap a later element of the list with one earlier than
     * i.  Under these circumstances, this method returns the element
     * that was previously at the end of the list and is now at some
     * position before i. This fact is used by iterator.remove so as to
     * avoid missing traversing elements.
     */
    private E removeAt(final int i) {
        assert i >= 0 && i < size;
        modCount++;
        final int s = --size;
        if (s == i) {
            queue[i] = null;
        } else {
            final E moved = (E) queue[s];
            queue[s] = null;
            siftDown(i, moved);
            if (queue[i] == moved) {
                siftUp(i, moved);
                if (queue[i] != moved) {
                    return moved;
                }
            }
        }
        return null;
    }

    /**
     * Inserts item x at position k, maintaining heap invariant by
     * promoting x up the tree until it is greater than or equal to
     * its parent, or is the root.
     * <p/>
     * To simplify and speed up coercions and comparisons. the
     * Comparable and Comparator versions are separated into different
     * methods that are otherwise identical. (Similarly for siftDown.)
     *
     * @param k the position to fill
     * @param x the item to insert
     */
    private void siftUp(final int k, final E x) {
        if (comparator != null) {
            siftUpUsingComparator(k, x);
        } else {
            siftUpComparable(k, x);
        }
    }

    private String sout(final Object[] queue) {
        final StringBuilder s = new StringBuilder("[");
        for (int i = 0; i < queue.length; i++) {
            final Object obj = queue[i];
            final String o = obj == null ? "nil" : obj.toString();
            if (i == queue.length - 1) {
                s.append(o).append("]");
            } else {
                s.append(o).append(" ");
            }
        }
        return s.toString();
    }

    private void siftUpUsingComparator(int k, final E x) {
        while (k > 0) {
            final int parent = k - 1 >>> 1;
            final Object e = queue[parent];
            if (comparator.compare(x, (E) e) >= 0) {
                break;
            }
            queue[k] = e;
            k = parent;
        }
        queue[k] = x;
    }

    /**
     * Inserts item x at position k, maintaining heap invariant by
     * demoting x down the tree repeatedly until it is less than or
     * equal to its children or is a leaf.
     *
     * @param k the position to fill
     * @param x the item to insert
     */
    private void siftDown(final int k, final E x) {
        if (comparator != null) {
            siftDownUsingComparator(k, x);
        } else {
            siftDownComparable(k, x);
        }
    }

    private void siftDownUsingComparator(int k, final E x) {
        final int half = size >>> 1;
        while (k < half) {
            int child = (k << 1) + 1;
            Object c = queue[child];
            final int right = child + 1;
            if (right < size && comparator.compare((E) c, (E) queue[right]) > 0) {
                c = queue[child = right];
            }
            if (comparator.compare(x, (E) c) <= 0) {
                break;
            }
            queue[k] = c;
            k = child;
        }
        queue[k] = x;
    }

    /**
     * Establishes the heap invariant (described above) in the entire tree,
     * assuming nothing about the order of the elements prior to the call.
     */
    private void heapify() {
        for (int i = (size >>> 1) - 1; i >= 0; i--) {
            siftDown(i, (E) queue[i]);
        }
    }

    /**
     * Returns the comparator used to order the elements in this
     * queue, or {@code null} if this queue is sorted according to
     * the {@linkplain Comparable natural ordering} of its elements.
     *
     * @return the comparator used to order this queue, or
     *         {@code null} if this queue is sorted according to the
     *         natural ordering of its elements
     */
    public Comparator<? super E> comparator() {
        return comparator;
    }

    /**
     * Saves the state of the instance to a stream (that
     * is, serializes it).
     *
     * @param s the stream
     * @serialData The length of the array backing the instance is
     * emitted (int), followed by all of its elements
     * (each an {@code Object}) in the proper order.
     */
    private void writeObject(final java.io.ObjectOutputStream s) throws java.io.IOException {
        // Write out element count, and any hidden stuff
        s.defaultWriteObject();

        // Write out array length, for compatibility with 1.5 version
        s.writeInt(Math.max(2, size + 1));

        // Write out all elements in the "proper order".
        for (int i = 0; i < size; i++) {
            s.writeObject(queue[i]);
        }
    }

    /**
     * Reconstitutes the {@code AirPriorityQueue} instance from a stream
     * (that is, deserializes it).
     *
     * @param s the stream
     */
    private void readObject(final java.io.ObjectInputStream s) throws java.io.IOException, ClassNotFoundException {
        // Read in size, and any hidden stuff
        s.defaultReadObject();

        // Read in (and discard) array length
        s.readInt();

        queue = new Object[size];

        // Read in all elements.
        for (int i = 0; i < size; i++) {
            queue[i] = s.readObject();
        }

        // Elements are guaranteed to be in "proper order", but the
        // spec has never explained what that might be.
        heapify();
    }

    private final class Itr implements Iterator<E> {
        /**
         * Index (into queue array) of element to be returned by
         * subsequent call to next.
         */
        private int cursor = 0;
        /**
         * Index of element returned by most recent call to next,
         * unless that element came from the forgetMeNot list.
         * Set to -1 if element is deleted by a call to remove.
         */
        private int lastRet = -1;
        /**
         * A queue of elements that were moved from the unvisited portion of
         * the heap into the visited portion as a result of "unlucky" element
         * removals during the iteration.  (Unlucky element removals are those
         * that require a siftup instead of a siftdown.)  We must visit all of
         * the elements in this list to complete the iteration.  We do this
         * after we've completed the "normal" iteration.
         * <p/>
         * We expect that most iterations, even those involving removals,
         * will not need to store elements in this field.
         */
        private ArrayDeque<E> forgetMeNot = null;
        /**
         * Element returned by the most recent call to next iff that
         * element was drawn from the forgetMeNot list.
         */
        private E lastRetElt = null;
        /**
         * The modCount value that the iterator believes that the backing
         * Queue should have.  If this expectation is violated, the iterator
         * has detected concurrent modification.
         */
        private int expectedModCount = modCount;

        @Override
        public boolean hasNext() {
            return cursor < size || forgetMeNot != null && !forgetMeNot.isEmpty();
        }

        @Override
        public E next() {
            if (expectedModCount != modCount) {
                throw new ConcurrentModificationException();
            }
            if (cursor < size) {
                return (E) queue[lastRet = cursor++];
            }
            if (forgetMeNot != null) {
                lastRet = -1;
                lastRetElt = forgetMeNot.poll();
                if (lastRetElt != null) {
                    return lastRetElt;
                }
            }
            throw new NoSuchElementException();
        }

        @Override
        public void remove() {
            if (expectedModCount != modCount) {
                throw new ConcurrentModificationException();
            }
            if (lastRet != -1) {
                final E moved = AirPriorityQueue.this.removeAt(lastRet);
                lastRet = -1;
                if (moved == null) {
                    cursor--;
                } else {
                    if (forgetMeNot == null) {
                        forgetMeNot = new ArrayDeque<>();
                    }
                    forgetMeNot.add(moved);
                }
            } else if (lastRetElt != null) {
                AirPriorityQueue.this.removeEq(lastRetElt);
                lastRetElt = null;
            } else {
                throw new IllegalStateException();
            }
            expectedModCount = modCount;
        }
    }
}